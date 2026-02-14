import { Download, Smartphone, AlertTriangle, CheckCircle2, Shield, FolderOpen, Copy, Link as LinkIcon, Loader2 } from 'lucide-react';
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
    
    // Use default v19 filename if no filename provided
    if (!filename) {
      filename = 'app-release-v19.aab';
    }
    
    setAabFilename(filename);
  }, []);

  const downloadUrl = `${siteOrigin}/downloads/${aabFilename}`;
  const pageUrl = `${siteOrigin}/aab-download?filename=${encodeURIComponent(aabFilename)}`;

  // Validate the download URL
  const { isValidating, validationResult, isValid, hasError } = useAabDownloadValidation(downloadUrl);

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
          {/* Validation Status - Prominent Error/Warning Display */}
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

          {/* AAB Download Link Section */}
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
                        Recommended naming convention for clarity (current default is v19):
                      </p>
                      <code className="block bg-muted px-3 py-2 rounded text-xs">
                        app-release-v19.aab
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
                        Example: <code className="bg-muted px-1 py-0.5 rounded">{siteOrigin}/downloads/app-release-v19.aab</code>
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
                  <CardDescription>How to submit your AAB to the Play Store</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Once you have downloaded your AAB file, follow these steps to upload it to the Google Play Console:
                </p>

                <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-sm">Sign in to Play Console</p>
                      <p className="text-sm text-muted-foreground">
                        Go to <a href="https://play.google.com/console" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">play.google.com/console</a> and sign in with your developer account
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-sm">Select your app</p>
                      <p className="text-sm text-muted-foreground">
                        Choose your app from the list or create a new app if this is your first release
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-sm">Navigate to Release section</p>
                      <p className="text-sm text-muted-foreground">
                        Go to <strong>Production</strong>, <strong>Open testing</strong>, <strong>Closed testing</strong>, or <strong>Internal testing</strong> depending on your release track
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-sm">Create a new release</p>
                      <p className="text-sm text-muted-foreground">
                        Click <strong>Create new release</strong> and upload your AAB file
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      5
                    </div>
                    <div>
                      <p className="font-medium text-sm">Fill in release details</p>
                      <p className="text-sm text-muted-foreground">
                        Add release notes, review the release, and submit for review
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>First Time Publishing?</AlertTitle>
                  <AlertDescription>
                    If this is your first time publishing to the Play Store, you'll need to complete additional steps including 
                    app content rating, privacy policy, and store listing information before you can publish your app.
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
