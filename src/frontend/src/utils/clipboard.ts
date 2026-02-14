/**
 * Attempt to copy text to clipboard with graceful error handling.
 * Returns true on success, false on failure.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (!navigator.clipboard) {
      return false;
    }
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Clipboard API failed (e.g., non-secure context, permission denied)
    return false;
  }
}
