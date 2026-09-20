import Papa from 'papaparse';
import JSZip from 'jszip';
import { normalizeSpotifyData } from './normalizeSpotifyData';

let cachedData = null;
let cachedPromise = null;

/**
 * Parses raw CSV text into normalized records.
 */
export function parseCSVText(csvText) {
  const results = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.replace(/^\uFEFF/, '').trim(),
  });

  console.log(`Parsed ${results.data.length} raw rows from CSV string`);
  const normalized = normalizeSpotifyData(results.data);
  console.log(`Normalized ${normalized.length} valid records`);
  cachedData = normalized;
  return normalized;
}

/**
 * Loads default spotify_history.csv from public path via native fetch with fallback paths.
 */
export function loadSpotifyData() {
  if (cachedData) {
    return Promise.resolve(cachedData);
  }
  if (cachedPromise) {
    return cachedPromise;
  }

  cachedPromise = async () => {
    const candidatePaths = [
      '/spotify_history.csv',
      './spotify_history.csv',
      'spotify_history.csv',
      '/extracted_archive/spotify_history.csv',
      './extracted_archive/spotify_history.csv',
    ];

    let csvText = null;
    let lastError = null;

    for (const path of candidatePaths) {
      try {
        console.log(`Attempting dataset fetch from: ${path}`);
        const response = await fetch(path);
        if (response.ok) {
          csvText = await response.text();
          if (csvText && csvText.includes('spotify_track_uri')) {
            console.log(`Successfully fetched dataset from ${path}`);
            break;
          }
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!csvText) {
      cachedPromise = null;
      throw new Error(`Failed to fetch spotify_history.csv from all candidate paths. ${lastError ? lastError.message : ''}`);
    }

    return parseCSVText(csvText);
  };

  return cachedPromise();
}

/**
 * Reads a user-uploaded File (.csv or .zip file like archive.zip)
 */
export async function loadCustomFile(file) {
  if (!file) throw new Error('No file provided');

  const fileName = file.name.toLowerCase();

  // If user uploaded a ZIP file (e.g. archive.zip)
  if (fileName.endsWith('.zip')) {
    console.log('Extracting archive.zip with JSZip...');
    const zip = await JSZip.loadAsync(file);
    let csvFile = zip.file('spotify_history.csv') || zip.file(/spotify_history\.csv$/i)[0];

    if (!csvFile) {
      const allCsvFiles = zip.file(/\.csv$/i);
      if (allCsvFiles.length > 0) {
        csvFile = allCsvFiles[0];
      }
    }

    if (!csvFile) {
      throw new Error('No spotify_history.csv found inside uploaded zip file.');
    }

    console.log('Found file inside zip:', csvFile.name);
    const csvText = await csvFile.async('string');
    return parseCSVText(csvText);
  }

  // If user uploaded a CSV file directly
  if (fileName.endsWith('.csv')) {
    const csvText = await file.text();
    return parseCSVText(csvText);
  }

  throw new Error('Unsupported file format. Please upload archive.zip or spotify_history.csv.');
}
