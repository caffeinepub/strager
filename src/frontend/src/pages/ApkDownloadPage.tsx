import { Download, Smartphone, AlertTriangle, CheckCircle2, Shield, FolderOpen, Copy, Link as LinkIcon, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getSiteOrigin } from '@/utils/siteOrigin';
import { copyToClipboard } from '@/utils/clipboard';
import { useApkDownloadValidation } from '@/hooks/useApkDownloadValidation';
import { useState, useEffect } from 'react';

export default function ApkDownloadPage() {
  const siteOrigin = getSiteOrigin();
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [copyPageSuccess, setCopyPageSuccess] = useState(false);
  const [copyPageError, setCopyPageError] = useState(false);
  
  // Read filename from URL query parameter
  const [apkFilename, setApkFilename] = useState<string>('');
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let filename = params.get('filename') || '';
    
    // Normalize filename: trim and ensure .apk extension
    filename = filename.trim();
    if (filename && !filename.endsWith('.apk')) {
      filename = `${filename}.apk`;
    }
    
    // Use default if no filename provided
    if (!filename) {
      filename = 'strager-marketplace-v20.apk';
    }
    
    setApkFilename(filename);
  }, []);

  const downloadUrl = `${siteOrigin}/downloads/${apkFilename}`;
  const pageUrl = `${siteOrigin}/apk-download?filename=${encodeURIComponent(apkFilename)}`;

  // Validate the download URL
  const { isValidating, validationResult, isValid, hasError } = useApkDownloadValidation(downloadUrl);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(downloadUrl);
    if (success) {
      setCopySuccess(true);
      setCopyError(false);
      setTimeout(() => setCopySuccess(false), 3000);
    } else {
      setCopyError(true);
      setCopySuccess(false);
      setTimeout(() => setCopyError(false), 3000);
    }
  };

  const handleCopyPageLink = async () => {
    const success = await copyToClipboard(pageUrl);
    if (success) {
      setCopyPageSuccess(true);
      setCopyPageError(false);
      setTimeout(() => setCopyPageSuccess(false), 3000);
    } else {
      setCopyPageError(true);
      setCopyPageSuccess(false);
      setTimeout(() => setCopyPageError(false), 3000);
    }
  };

  return (
    <div className="container-custom py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Download className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="mb-3 text-4xl font-bold">Download Android APK</h1>
          <p className="text-lg text-muted-foreground">
            Install Strager Marketplace directly on your Android device
          </p>
        </div>

        {/* Security Disclaimer */}
        <Alert variant="destructive" className="mb-8">
          <Shield className="h-4 w-4" />
          <AlertTitle>Security Notice</AlertTitle>
          <AlertDescription>
            Only install APK files from trusted sources. Before installing, verify that the filename and version match what you expect. 
            Installing apps from unknown sources can pose security risks to your device and personal data.
          </AlertDescription>
        </Alert>

        <div className="space-y-8">
          {/* Validation Status - Prominent Error/Warning Display */}
          {isValidating && (
            <Alert className="border-blue-500/50 bg-blue-500/10">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" />
              <AlertTitle className="text-blue-600 dark:text-blue-400">Validating APK...</AlertTitle>
              <AlertDescription className="text-blue-600/80 dark:text-blue-400/80">
                Checking if the APK file is available at the download URL...
              </AlertDescription>
            </Alert>
          )}

          {hasError && validationResult?.status === 'missing' && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>APK File Not Found</AlertTitle>
              <AlertDescription>
                The APK file is not available at the download URL (HTTP {validationResult.httpStatus}). 
                Please verify that the file <code className="bg-destructive/20 px-1.5 py-0.5 rounded text-xs">{apkFilename}</code> has been 
                uploaded to <code className="bg-destructive/20 px-1.5 py-0.5 rounded text-xs">frontend/public/downloads/</code> and that 
                the filename matches exactly.
              </AlertDescription>
            </Alert>
          )}

          {hasError && validationResult?.status === 'not-apk' && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning: Not an APK File</AlertTitle>
              <AlertDescription>
                The download link is not serving an APK file. The server returned content type: <code className="bg-destructive/20 px-1.5 py-0.5 rounded text-xs">{validationResult.contentType}</code>. 
                You may be downloading an HTML page or document instead of an APK. Please check that the correct file has been uploaded 
                to <code className="bg-destructive/20 px-1.5 py-0.5 rounded text-xs">frontend/public/downloads/{apkFilename}</code>.
              </AlertDescription>
            </Alert>
          )}

          {hasError && validationResult?.status === 'unknown' && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Validation Error</AlertTitle>
              <AlertDescription>
                Unable to validate the APK download URL. Error: {validationResult.error}. 
                The file may still be accessible, but we couldn't verify it automatically.
              </AlertDescription>
            </Alert>
          )}

          {isValid && !isValidating && (
            <Alert className="border-green-500/50 bg-green-500/10">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-600 dark:text-green-400">APK File Verified</AlertTitle>
              <AlertDescription className="text-green-600/80 dark:text-green-400/80">
                The APK file is available and ready for download.
              </AlertDescription>
            </Alert>
          )}

          {/* APK Download Link Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <LinkIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle>Direct APK Download Link</CardTitle>
                  <CardDescription>Direct download link for the Android APK file</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Current APK filename:</p>
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <code className="text-sm break-all">{apkFilename}</code>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Full download URL:</p>
                  <div className="rounded-lg border bg-background p-3">
                    <code className="text-xs break-all">{downloadUrl}</code>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button asChild className="w-full sm:w-auto">
                    <a href={downloadUrl} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download APK
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleCopyLink}
                    className="w-full sm:w-auto"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </Button>
                </div>

                {copySuccess && (
                  <Alert className="border-green-500/50 bg-green-500/10">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertTitle className="text-green-600 dark:text-green-400">Link Copied!</AlertTitle>
                    <AlertDescription className="text-green-600/80 dark:text-green-400/80">
                      The download link has been copied to your clipboard.
                    </AlertDescription>
                  </Alert>
                )}

                {copyError && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Copy Failed</AlertTitle>
                    <AlertDescription>
                      Unable to copy to clipboard. Your browser may not support this feature or clipboard access may be blocked. 
                      Please manually copy the URL above.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          {/* APK Download Page Link Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                  <LinkIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle>APK Download Page Link</CardTitle>
                  <CardDescription>Shareable link to this download page</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Page URL with filename parameter:</p>
                  <div className="rounded-lg border bg-background p-3">
                    <code className="text-xs break-all">{pageUrl}</code>
                  </div>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Safer Sharing</AlertTitle>
                  <AlertDescription>
                    Sharing this page link is safer than sharing the direct file link. Users can see installation instructions, 
                    security warnings, and verify the file before downloading.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    onClick={handleCopyPageLink}
                    className="w-full sm:w-auto"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Page Link
                  </Button>
                </div>

                {copyPageSuccess && (
                  <Alert className="border-green-500/50 bg-green-500/10">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertTitle className="text-green-600 dark:text-green-400">Page Link Copied!</AlertTitle>
                    <AlertDescription className="text-green-600/80 dark:text-green-400/80">
                      The page link has been copied to your clipboard.
                    </AlertDescription>
                  </Alert>
                )}

                {copyPageError && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Copy Failed</AlertTitle>
                    <AlertDescription>
                      Unable to copy to clipboard. Your browser may not support this feature or clipboard access may be blocked. 
                      Please manually copy the URL above.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Developer Instructions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <FolderOpen className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle>For Developers: Hosting Your APK</CardTitle>
                  <CardDescription>How to make your APK available for download</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  To host your APK file for download, follow these steps:
                </p>

                <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-sm">Place your APK file</p>
                      <p className="text-sm text-muted-foreground">
                        Copy your built APK file into the <code className="bg-muted px-1.5 py-0.5 rounded text-xs">frontend/public/downloads/</code> folder
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-sm">Use versioned naming</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        Recommended naming convention for clarity:
                      </p>
                      <code className="block bg-muted px-3 py-2 rounded text-xs">
                        strager-marketplace-v20.apk
                      </code>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-sm">Update the page URL with filename parameter</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        Point users to this page with the filename parameter:
                      </p>
                      <div className="mt-2 rounded-lg bg-background border p-3">
                        <code className="text-xs break-all">
                          {siteOrigin}/apk-download?filename=<span className="text-primary font-semibold">your-file.apk</span>
                        </code>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        The download link will automatically update to match the filename parameter.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-sm">Your APK will be served at</p>
                      <div className="mt-2 rounded-lg bg-background border p-3">
                        <code className="text-xs break-all">
                          {siteOrigin}/downloads/<span className="text-primary font-semibold">&lt;filename&gt;.apk</span>
                        </code>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Example: <code className="bg-muted px-1 py-0.5 rounded">{siteOrigin}/downloads/strager-marketplace-v20.apk</code>
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Use versioned filenames to avoid browser caching confusion. When you update the APK, use a new version number 
                    and update the filename parameter in the page URL.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* End-User Installation Instructions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <Smartphone className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle>Installation Instructions</CardTitle>
                  <CardDescription>How to install the APK on your Android device</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Follow these steps to install the APK on your Android device:
                </p>

                <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-sm">Enable Unknown Sources</p>
                      <p className="text-sm text-muted-foreground">
                        Go to Settings → Security → Enable "Install from Unknown Sources" or "Install Unknown Apps" for your browser
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-sm">Download the APK</p>
                      <p className="text-sm text-muted-foreground">
                        Tap the "Download APK" button above. The file will be saved to your Downloads folder
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-sm">Open the APK file</p>
                      <p className="text-sm text-muted-foreground">
                        Open your Downloads folder or notification, then tap the APK file to begin installation
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-sm">Install the app</p>
                      <p className="text-sm text-muted-foreground">
                        Follow the on-screen prompts to complete the installation. You may need to grant permissions
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      5
                    </div>
                    <div>
                      <p className="font-medium text-sm">Launch the app</p>
                      <p className="text-sm text-muted-foreground">
                        Once installed, you can find the app in your app drawer and launch it
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Security Reminder</AlertTitle>
                  <AlertDescription>
                    Only install APK files from sources you trust. Installing apps from unknown sources can be risky. 
                    Make sure you're downloading from the official source and verify the filename matches what you expect.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
