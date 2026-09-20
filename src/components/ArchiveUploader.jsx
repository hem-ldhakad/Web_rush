import React, { useRef, useState } from 'react';
import { useData } from '../context/DataContext';
import { Upload, FileArchive, FileSpreadsheet, Check, AlertCircle, RefreshCw } from 'lucide-react';

export function ArchiveUploader({ onComplete }) {
  const { handleUploadFile, customFileLoaded, reloadDefaultData, loading } = useData();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  const processFile = async (file) => {
    if (!file) return;
    setUploading(true);
    setStatusMsg(`Processing ${file.name}...`);
    setIsError(false);

    try {
      const records = await handleUploadFile(file);
      setStatusMsg(`Successfully loaded ${records.length.toLocaleString()} records from ${file.name}!`);
      setUploading(false);
      if (onComplete) onComplete();
    } catch (err) {
      console.error(err);
      setStatusMsg(err.message || 'Error processing archive file');
      setIsError(true);
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".zip,.csv"
        className="hidden"
      />

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="p-6 rounded-xl bg-surface-container-low hover:bg-surface-container border-2 border-dashed border-primary-container/60 hover:border-primary text-center transition-all cursor-pointer space-y-3"
      >
        <div className="w-12 h-12 rounded-full bg-primary-container/20 text-primary flex items-center justify-center mx-auto">
          {uploading ? (
            <RefreshCw className="w-6 h-6 animate-spin" />
          ) : (
            <Upload className="w-6 h-6" />
          )}
        </div>

        <div className="space-y-1">
          <div className="font-syne font-semibold text-sm text-on-surface">
            {uploading ? 'Processing Data Archive...' : 'Click or Drag & Drop archive.zip or spotify_history.csv'}
          </div>
          <p className="font-mono text-xs text-on-surface-variant">
            Supports official <code>archive.zip</code> or uncompressed <code>spotify_history.csv</code>
          </p>
        </div>

        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-primary text-on-primary font-mono text-xs uppercase tracking-wider font-bold shadow-sm inline-flex items-center gap-1.5"
        >
          <FileArchive className="w-4 h-4" />
          <span>Select archive.zip file</span>
        </button>
      </div>

      {statusMsg && (
        <div
          className={`p-3 rounded-lg font-mono text-xs flex items-center gap-2 ${
            isError
              ? 'bg-error-container/40 text-on-error-container border border-error/30'
              : 'bg-primary-container/20 text-on-primary-container border border-primary-container/40'
          }`}
        >
          {isError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <Check className="w-4 h-4 shrink-0" />}
          <span>{statusMsg}</span>
        </div>
      )}

      {customFileLoaded && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              reloadDefaultData();
              setStatusMsg('Reloaded default workspace archive.');
              setIsError(false);
            }}
            className="font-mono text-xs text-on-surface-variant hover:text-primary underline"
          >
            Reset to default spotify_history.csv
          </button>
        </div>
      )}
    </div>
  );
}
