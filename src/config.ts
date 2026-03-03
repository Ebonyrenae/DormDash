/**
 * API base URL for backend. Prefer VITE_API_BASE in .env for flexibility.
 */
export const API_BASE =
  (import.meta as any).env?.VITE_API_BASE ||
  "https://cattle.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api";
