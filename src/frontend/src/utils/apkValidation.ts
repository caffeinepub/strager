/**
 * APK validation result types
 */
export type ApkValidationResult = 
  | { status: 'ok' }
  | { status: 'missing'; httpStatus: number }
  | { status: 'not-apk'; contentType: string }
  | { status: 'unknown'; error: string };

/**
 * Validate that a URL points to an accessible APK file.
 * Performs a HEAD request first, falls back to GET if needed.
 * Returns validation result with status and relevant metadata.
 */
export async function validateApkUrl(url: string): Promise<ApkValidationResult> {
  try {
    // Try HEAD request first (lightweight)
    let response = await fetch(url, { method: 'HEAD' });
    
    // Some servers don't support HEAD, fallback to GET
    if (response.status === 405 || response.status === 501) {
      response = await fetch(url, { method: 'GET' });
    }
    
    // Check if file exists
    if (!response.ok) {
      return { status: 'missing', httpStatus: response.status };
    }
    
    // Check Content-Type header
    const contentType = response.headers.get('Content-Type') || '';
    
    // Valid APK content types
    const validApkTypes = [
      'application/vnd.android.package-archive',
      'application/octet-stream',
      'application/zip',
    ];
    
    // Check if content type indicates HTML (common for 404 pages served as 200)
    if (contentType.includes('text/html')) {
      return { status: 'not-apk', contentType };
    }
    
    // If content type is present and not a valid APK type, warn
    if (contentType && !validApkTypes.some(type => contentType.includes(type))) {
      // Allow empty content type (some servers don't set it)
      if (contentType.trim() !== '') {
        return { status: 'not-apk', contentType };
      }
    }
    
    return { status: 'ok' };
  } catch (error) {
    return { 
      status: 'unknown', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
