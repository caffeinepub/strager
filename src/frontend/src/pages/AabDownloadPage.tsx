import { Download, Smartphone, AlertTriangle, CheckCircle2, Shield, FolderOpen, Copy, Link as LinkIcon, Loader2, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getSiteOrigin } from '@/utils/siteOrigin';
import { copyToClipboard } from '@/utils/clipboard';
import { useAabDownloadValidation } from '@/hooks/useAabDownloadValidation';
import { useState, useEffect } from 'react';

export default function AabDownloadPage() {
  const siteOrigin = getSiteOrigin();
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [copyPageSuccess, setCopyPageSuccess] = useState(false);
  const [copyPageError, setCopyPageError] = useState(false);
  
  // Read filename from URL query parameter
  const [aabFilename, setAabFilename] = useState<string>('');
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let filename = params.get('filename') || '';
    
    // Normalize filename: trim and ensure .aab extension
    filename = filename.trim();
    if (filename && !filename.endsWith('.aab')) {
      filename = `${filename}.aab`;
    }
    
    // Use default v22 filename if no filename provided
    if (!filename) {
      filename = 'app-release-v22.aab';
    }
    
    setAabFilename(filename);
  }, []);

  const downloadUrl = siteOrigin ? `${siteOrigin}/downloads/${aabFilename}` : '';
  const pageUrl = siteOrigin ? `${siteOrigin}/aab-download?filename=${encodeURIComponent(aabFilename)}` : '';

  // Validate the download URL only when available
  const { isValidating, validationResult, isValid, hasError } = useAabDownloadValidation(downloadUrl);

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
          <h1 className="mb-3 text-4xl font-bold">Download Android AAB</h1>
          <p className="text-lg text-muted-foreground">
            Android App Bundle for Google Play Console upload
          </p>
        </div>

        {/* Important Notice */}
        <Alert className="mb-8">
          <Shield className="h-4 w-4" />
          <AlertTitle>Important: AAB is for Play Store Only</AlertTitle>
          <AlertDescription>
            Android App Bundles (AAB) cannot be installed directly on devices like APK files. 
            AAB files must be uploaded to the Google Play Console, where Google will generate 
            optimized APKs for different device configurations. If you need a file for direct 
            installation, use the APK download page instead.
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
                <Alert className="border-accent/50 bg-accent/10">
                  <Loader2 className="h-4 w-4 animate-spin text-accent" />
                  <AlertTitle className="text-accent">Validating AAB...</AlertTitle>
                  <AlertDescription className="text-accent/80">
                    Checking if the AAB file is available at the download URL...
                  </AlertDescription>
                </Alert>
              )}

              {hasError && validationResult?.status === 'missing' && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>AAB File Not Found</AlertTitle>
                  <AlertDescription>
                    The AAB file is not available at the download URL (HTTP {validationResult.httpStatus}). 
                    Please verify that the file <code className="bg-destructive/20 px-1.5 py-0.5 rounded text-xs">{aabFilename}</code> has been 
                    uploaded to <code className="bg-destructive/20 px-1.5 py-0.5 rounded text-xs">frontend/public/downloads/</code> and that 
                    the filename matches exactly.
                  </AlertDescription>
                </Alert>
              )}

              {hasError && validationResult?.status === 'not-aab' && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning: Not an AAB File</AlertTitle>
                  <AlertDescription>
                    The download link is not serving an AAB file. The server returned content type: <code className="bg-destructive/20 px-1.5 py-0.5 rounded text-xs">{validationResult.contentType}</code>. 
                    You may be downloading an HTML page or document instead of an AAB. Please check that the correct file has been uploaded 
                    to <code className="bg-destructive/20 px-1.5 py-0.5 rounded text-xs">frontend/public/downloads/{aabFilename}</code>.
                  </AlertDescription>
                </Alert>
              )}

              {hasError && validationResult?.status === 'unknown' && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Validation Error</AlertTitle>
                  <AlertDescription>
                    Unable to validate the AAB download URL. Error: {validationResult.error}. 
                    The file may still be accessible, but we couldn't verify it automatically.
                  </AlertDescription>
                </Alert>
              )}

              {isValid && !isValidating && (
                <Alert className="border-green-500/50 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-green-600 dark:text-green-400">AAB File Verified</AlertTitle>
                  <AlertDescription className="text-green-600/80 dark:text-green-400/80">
                    The AAB file is available and ready for download.
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}

          {/* AAB Download Link Section - Only show when origin is available */}
          {siteOrigin && (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                      <LinkIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <CardTitle>Direct AAB Download Link</CardTitle>
                      <CardDescription>Direct download link for the Android App Bundle file</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Current AAB filename:</p>
                      <div className="rounded-lg border bg-muted/30 p-3">
                        <code className="text-sm break-all">{aabFilename}</code>
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
                          Download AAB
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

              {/* AAB Download Page Link Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                      <LinkIcon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle>AAB Download Page Link</CardTitle>
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
                        Sharing this page link provides context about AAB files and ensures users understand 
                        that AAB files are for Play Store upload only, not direct installation.
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
                      <CardTitle>For Developers: Hosting Your AAB</CardTitle>
                      <CardDescription>How to make your AAB available for download</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      To host your AAB file for download, follow these steps:
                    </p>

                    <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-sm">Place your AAB file</p>
                          <p className="text-sm text-muted-foreground">
                            Copy your built AAB file into the <code className="bg-muted px-1.5 py-0.5 rounded text-xs">frontend/public/downloads/</code> folder
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
                            Recommended naming convention for clarity (current default is v22):
                          </p>
                          <code className="block bg-muted px-3 py-2 rounded text-xs">
                            app-release-v22.aab
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
                              {siteOrigin}/aab-download?filename=<span className="text-primary font-semibold">your-file.aab</span>
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
                          <p className="font-medium text-sm">Your AAB will be served at</p>
                          <div className="mt-2 rounded-lg bg-background border p-3">
                            <code className="text-xs break-all">
                              {siteOrigin}/downloads/<span className="text-primary font-semibold">&lt;filename&gt;.aab</span>
                            </code>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Example: <code className="bg-muted px-1 py-0.5 rounded">{siteOrigin}/downloads/app-release-v22.aab</code>
                          </p>
                        </div>
                      </div>
                    </div>

                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Important</AlertTitle>
                      <AlertDescription>
                        Use versioned filenames to avoid browser caching confusion. When you update the AAB, use a new version number 
                        and update the filename parameter in the page URL.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <Separator />

          {/* Play Console Upload Instructions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <Smartphone className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle>Uploading to Google Play Console</CardTitle>
                  <CardDescription>Steps to submit your AAB to the Play Store</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">Sign in to Google Play Console</span>
                    <p className="ml-5 mt-1">Visit <a href="https://play.google.com/console" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">play.google.com/console</a> and sign in with your developer account</p>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Select your app</span>
                    <p className="ml-5 mt-1">Choose the app you want to update, or create a new app if this is your first release</p>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Navigate to Release section</span>
                    <p className="ml-5 mt-1">Go to Production → Create new release (or Internal testing / Closed testing for testing releases)</p>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Upload your AAB</span>
                    <p className="ml-5 mt-1">Click "Upload" and select your downloaded AAB file. Google will process and optimize it for different devices</p>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Fill in release details</span>
                    <p className="ml-5 mt-1">Add release notes, review the app content, and complete any required information</p>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Review and roll out</span>
                    <p className="ml-5 mt-1">Review your release and click "Start rollout to Production" (or your chosen track)</p>
                  </li>
                </ol>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>First-time Setup</AlertTitle>
                  <AlertDescription>
                    If this is your first release, you'll need to complete additional steps including app content rating, 
                    target audience, privacy policy, and store listing details before you can publish.
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
