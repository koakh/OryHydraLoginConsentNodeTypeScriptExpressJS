/**
 * Axios Helper
 * https://github.com/axios/axios/blob/fe7d09bb08fa1c0e414956b7fc760c80459b0a43/lib/helpers/combineURLs.js
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
export const combineURLs = (baseURL: string, relativeURL: string): string => {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};