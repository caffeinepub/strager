import { Download, Smartphone, AlertTriangle, CheckCircle2, Shield, FolderOpen, Copy, Link as LinkIcon, Loader2, Info } from 'lucide-react';
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
      filename = 'strager-marketplace-v21.apk';
    }
    
    setApkFilename(filename);
  }, []);

  const downloadUrl = siteOrigin ? `${siteOrigin}/downloads/${apkFilename}` : '';
  const pageUrl = siteOrigin ? `${siteOrigin}/apk-download?filename=${encodeURIComponent(apkFilename)}` : '';

  // Validate the download URL only when available
  const { isValidating, validationResult, isValid, hasError } = useApkDownloadValidation(downloadUrl);

  const handleCopyLink = async () => {
    if (!downloadUrl) return;
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
    if (!pageUrl) return;
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
            Install Strager directly on your Android device
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
          {/* SSR Notice - Show when origin is unavailable */}
          {!siteOrigin && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>URLs Available in Browser Only</AlertTitle>
              <AlertDescription>
                Download links and page URLs are generated based on your current domain and are only available when viewing this page in a browser.
              </AlertDescription>
            </Alert>
          )}

          {/* Validation Status - Only show when origin is available */}
          {siteOrigin && (
            <>
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
            </>
          )}

          {/* APK Download Link Section - Only show when origin is available */}
          {siteOrigin && (
            <>
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                      <LinkIcon className="h-6 w-6 text-accent" />
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
                      <AlertTitle>Recommended for Sharing</AlertTitle>
                      <AlertDescription>
                        Sharing this page link provides context about APK installation and ensures users see 
                        important security warnings before downloading.
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
                            Recommended naming convention for clarity (current default is v21):
                          </p>
                          <code className="block bg-muted px-3 py-2 rounded text-xs">
                            strager-marketplace-v21.apk
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
                            Example: <code className="bg-muted px-1 py-0.5 rounded">{siteOrigin}/downloads/strager-marketplace-v21.apk</code>
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
            </>
          )}

          <Separator />

          {/* Installation Instructions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Installation Instructions</CardTitle>
                  <CardDescription>How to install the APK on your Android device</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">For End Users:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Download the APK file to your Android device</li>
                    <li>Open your device Settings → Security (or Privacy)</li>
                    <li>Enable "Install unknown apps" for your browser or file manager</li>
                    <li>Locate the downloaded APK file in your Downloads folder</li>
                    <li>Tap the APK file and follow the installation prompts</li>
                    <li>Once installed, you can find the app in your app drawer</li>
                  </ol>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Security Tip</AlertTitle>
                  <AlertDescription>
                    After installation, you can disable "Install unknown apps" again for added security.
                  </AlertDescription>
                </Alert>

                <div>
                  <h3 className="font-semibold mb-2">For Developers:</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Install via ADB (Android Debug Bridge):
                  </p>
                  <div className="rounded-lg bg-muted p-3">
                    <code className="text-xs">adb install path/to/{apkFilename || 'your-app.apk'}</code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
