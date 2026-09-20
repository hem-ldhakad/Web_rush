/**
 * @file exportService.js
 * @description Export service for downloading JSON payloads and formatted Markdown reports.
 */

import { exportSummaryJSON, exportMarkdownReport } from '../utils/exportData';

export const exportService = {
  /**
   * Triggers JSON summary download.
   * @param {Object} stats Quantitative stats
   * @param {Array} insights Discoveries list
   */
  downloadJSON(stats, insights) {
    exportSummaryJSON(stats, insights);
  },

  /**
   * Triggers Markdown report download.
   * @param {Object} stats Quantitative stats
   * @param {Array} eras Chronological eras
   * @param {Array} insights Discoveries list
   */
  downloadMarkdown(stats, eras, insights) {
    exportMarkdownReport(stats, eras, insights);
  },
};
