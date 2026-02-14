/**
 * Get the current site origin at runtime.
 * Safe for both client and server-side rendering.
 * Returns null when window is unavailable (SSR) to prevent showing placeholder URLs.
 */
export function getSiteOrigin(): string | null {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Return null for SSR - UI should handle this gracefully
  return null;
}
