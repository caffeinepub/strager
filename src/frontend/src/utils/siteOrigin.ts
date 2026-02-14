/**
 * Get the current site origin at runtime.
 * Safe for both client and server-side rendering.
 */
export function getSiteOrigin(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Fallback for SSR or when window is unavailable
  return 'https://your-domain.com';
}
