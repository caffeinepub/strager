import { useState, useEffect } from 'react';
import { validateApkUrl, ApkValidationResult } from '@/utils/apkValidation';

/**
 * Hook to validate APK download URL.
 * Runs validation when the URL changes and manages loading/result states.
 */
export function useApkDownloadValidation(downloadUrl: string) {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ApkValidationResult | null>(null);

  useEffect(() => {
    // Skip validation if URL is empty
    if (!downloadUrl) {
      setValidationResult(null);
      return;
    }

    let cancelled = false;

    const runValidation = async () => {
      setIsValidating(true);
      setValidationResult(null);

      try {
        const result = await validateApkUrl(downloadUrl);
        if (!cancelled) {
          setValidationResult(result);
        }
      } finally {
        if (!cancelled) {
          setIsValidating(false);
        }
      }
    };

    runValidation();

    // Cleanup function to prevent state updates after unmount
    return () => {
      cancelled = true;
    };
  }, [downloadUrl]);

  return {
    isValidating,
    validationResult,
    isValid: validationResult?.status === 'ok',
    hasError: validationResult && validationResult.status !== 'ok',
  };
}
