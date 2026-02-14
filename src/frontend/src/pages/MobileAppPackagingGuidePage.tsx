import { Package, Smartphone, Apple, Chrome, Code2, FileCode, Image, Palette, CheckCircle2, ExternalLink, Copy, FileText, AlertTriangle, Download } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';
import { getSiteOrigin } from '@/utils/siteOrigin';
import { copyToClipboard } from '@/utils/clipboard';

export default function MobileAppPackagingGuidePage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);

  const siteOrigin = getSiteOrigin();

  const handleCopy = async (text: string, field: string) => {
    setCopyError(null);
    const success = await copyToClipboard(text);
    
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } else {
      setCopyError('Unable to copy automatically. Please select and copy the text manually.');
      setTimeout(() => setCopyError(null), 5000);
    }
  };

  const playStoreMetadata = {
    appName: "Strager Marketplace",
    shortDescription: "Buy and sell products in a vibrant online marketplace. Discover unique items, manage your shop, and connect with buyers and sellers.",
    fullDescription: `Strager Marketplace is your go-to platform for buying and selling products online. Whether you're looking for unique items or want to start your own shop, Strager makes it easy.

KEY FEATURES:
• Browse thousands of products across multiple categories
• Create your own seller account and list products
• Secure shopping cart and checkout process
• Track your orders in real-time
• Manage your seller dashboard with ease
• Search and filter to find exactly what you need
• Responsive design works on any device

FOR BUYERS:
Discover products from trusted sellers, add items to your cart, and complete purchases with our streamlined checkout. Track all your orders and manage your account from one place.

FOR SELLERS:
Turn your passion into profit. Create product listings with photos and descriptions, manage inventory, and reach customers worldwide. Our seller dashboard makes it simple to run your online shop.

SAFE & SECURE:
Your privacy and security are our top priorities. All transactions are processed securely, and we never share your personal information without your consent.

Download Strager Marketplace today and join our growing community of buyers and sellers!`,
    category: "Shopping",
    contentRating: "Everyone",
    privacyPolicyUrl: `${siteOrigin}/privacy`,
    termsUrl: `${siteOrigin}/terms`,
    supportUrl: `${siteOrigin}/support`
  };

  return (
    <div className="container-custom py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl font-bold">Package as Mobile App</h1>
          <p className="text-lg text-muted-foreground">
            Learn how to publish Strager to the Play Store or App Store
          </p>
        </div>

        {/* Important Notice */}
        <Alert className="mb-8">
          <Package className="h-4 w-4" />
          <AlertTitle>Important Note</AlertTitle>
          <AlertDescription>
            This guide provides instructions for packaging your website as a mobile app wrapper. 
            This project does not automatically generate APK, AAB, or IPA files. You'll need to use 
            external tools and follow platform-specific submission processes.
          </AlertDescription>
        </Alert>

        {/* Copy Error Alert */}
        {copyError && (
          <Alert variant="destructive" className="mb-8">
            <AlertTitle>Copy Failed</AlertTitle>
            <AlertDescription>{copyError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-8">
          {/* PWA Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Option 1: Progressive Web App (PWA)</CardTitle>
                  <CardDescription>Already implemented — no store submission needed</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your Strager website is already a Progressive Web App. Users can install it directly 
                from their browser without going through app stores.
              </p>
              
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="mb-2 font-semibold text-sm">Benefits:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>No app store approval process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Instant updates (no app store delays)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Works on both Android and iOS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>No developer fees</span>
                  </li>
                </ul>
              </div>

              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link to="/install">
                  View PWA Install Instructions
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Separator />

          {/* Android Wrapper Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <Chrome className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle>Option 2: Android Wrapper App (Play Store)</CardTitle>
                  <CardDescription>Package your website as a native Android app</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                An Android wrapper app loads your website inside a native Android container. This allows 
                you to publish to the Google Play Store while maintaining your web-based codebase.
              </p>

              {/* Build an APK (Android) Section */}
              <div className="rounded-lg border-2 border-accent/30 bg-accent/5 p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-accent" />
                    Build an APK (Android)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Follow these steps to create an Android application package for local testing (APK) 
                    or Play Store submission (AAB).
                  </p>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>APK vs AAB</AlertTitle>
                  <AlertDescription>
                    <strong>APK (Android Package)</strong> is used for local testing and direct installation on devices. 
                    <strong className="ml-1">AAB (Android App Bundle)</strong> is required for Play Store submission and allows 
                    Google to optimize the app for different device configurations.
                  </AlertDescription>
                </Alert>

                <div>
                  <h4 className="mb-4 font-semibold text-lg">Step-by-Step Checklist:</h4>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Choose your wrapper approach</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Select one of the following methods to create your Android wrapper:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span><strong>Android Studio WebView wrapper:</strong> Create a native Android project with a WebView component that loads your website URL</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span><strong>Trusted Web Activity (TWA):</strong> Use Chrome Custom Tabs to display your PWA in full-screen mode (recommended for PWAs)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span><strong>Third-party tools:</strong> Use PWABuilder, Capacitor, or Cordova to generate the wrapper automatically</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Set up your Android project</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Configure your project with these details:
                        </p>
                        <div className="rounded-lg bg-muted/50 p-3 text-xs font-mono space-y-1">
                          <p><span className="text-muted-foreground">App Name:</span> Strager Marketplace</p>
                          <p><span className="text-muted-foreground">Package Name:</span> com.strager.marketplace (or your domain)</p>
                          <p><span className="text-muted-foreground">Website URL:</span> {siteOrigin}</p>
                          <p><span className="text-muted-foreground">Theme Color:</span> #ff6b35</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* TWA Prerequisite Subsection */}
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                        3
                      </div>
                      <div className="w-full">
                        <p className="font-medium mb-2">Trusted Web Activity (TWA) prerequisite</p>
                        <Alert className="mb-3">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Digital Asset Links Required</AlertTitle>
                          <AlertDescription>
                            If using TWA, you must configure Digital Asset Links to verify your app's connection to your website.
                          </AlertDescription>
                        </Alert>
                        <div className="space-y-3 text-sm">
                          <p className="text-muted-foreground">
                            This project includes a Digital Asset Links file at <code className="text-xs bg-muted px-1 py-0.5 rounded">frontend/public/.well-known/assetlinks.json</code> with placeholder values that <strong>must be replaced</strong>:
                          </p>
                          <div className="rounded-lg bg-muted/50 p-3 text-xs font-mono space-y-1">
                            <p><span className="text-destructive font-bold">PACKAGE_NAME_HERE</span> → Replace with your actual package name (e.g., com.strager.marketplace)</p>
                            <p><span className="text-destructive font-bold">SHA256_FINGERPRINT_HERE</span> → Replace with your app's SHA-256 certificate fingerprint</p>
                          </div>
                          <p className="text-muted-foreground">
                            <strong>How to obtain these values:</strong> See the detailed instructions in <code className="text-xs bg-muted px-1 py-0.5 rounded">frontend/public/.well-known/assetlinks.README.txt</code> which explains:
                          </p>
                          <ul className="ml-4 space-y-1 text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <span>•</span>
                              <span>How to get your package name from your Android project</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span>•</span>
                              <span>How to generate and extract the SHA-256 fingerprint using keytool</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span>•</span>
                              <span>How to update the assetlinks.json file and deploy it</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span>•</span>
                              <span>How to verify your configuration is working</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Build your APK or AAB</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Use Android Studio or command-line tools to build:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span><strong>Debug APK:</strong> For testing on your device</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span><strong>Release APK:</strong> Signed APK for distribution outside Play Store</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span><strong>Release AAB:</strong> Required for Play Store submission</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                        5
                      </div>
                      <div>
                        <p className="font-medium">Test your APK</p>
                        <p className="text-sm text-muted-foreground">
                          Install the APK on a physical Android device or emulator to verify functionality before submission.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Build a Release AAB (Play Store submission) Section */}
                <div className="rounded-lg border-2 border-green-600/30 bg-green-600/5 p-6 space-y-4">
                  <div>
                    <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
                      Build a Release AAB (Google Play submission)
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Google Play requires an Android App Bundle (AAB) for all new apps and updates. Follow these steps to build a release AAB from your Android wrapper project.
                    </p>
                  </div>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Important: You Cannot Convert APK to AAB</AlertTitle>
                    <AlertDescription>
                      An existing APK file cannot be reliably converted into an AAB. You must build the AAB directly from your Android wrapper project source code (WebView/TWA/etc.) using Android Studio or Gradle.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2 text-sm">Option A: Using Android Studio</h5>
                      <ol className="space-y-2 text-sm text-muted-foreground ml-4">
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-accent">1.</span>
                          <span>Open your Android wrapper project in Android Studio</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-accent">2.</span>
                          <span>Go to <strong>Build → Generate Signed Bundle / APK</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-accent">3.</span>
                          <span>Select <strong>Android App Bundle</strong> and click Next</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-accent">4.</span>
                          <span>Choose or create a keystore for signing (required for release builds)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-accent">5.</span>
                          <span>Select the <strong>release</strong> build variant</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-accent">6.</span>
                          <span>Click Finish and wait for the build to complete</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-accent">7.</span>
                          <span>Find the generated <code className="text-xs bg-muted px-1 py-0.5 rounded">.aab</code> file in <code className="text-xs bg-muted px-1 py-0.5 rounded">app/build/outputs/bundle/release/</code></span>
                        </li>
                      </ol>
                    </div>

                    <Separator />

                    <div>
                      <h5 className="font-semibold mb-2 text-sm">Option B: Using Gradle Command Line</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        From your Android project root directory, run:
                      </p>
                      <div className="rounded-lg bg-muted/50 p-3 text-xs font-mono">
                        ./gradlew bundleRelease
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        The AAB will be generated at <code className="text-xs bg-muted px-1 py-0.5 rounded">app/build/outputs/bundle/release/app-release.aab</code>
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h5 className="font-semibold mb-2 text-sm">Release Signing Requirements</h5>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Release AABs must be signed with a release keystore. You'll need:
                        </p>
                        <ul className="ml-4 space-y-1">
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span><strong>Keystore file:</strong> A .jks or .keystore file containing your signing key</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span><strong>Keystore password:</strong> Password to access the keystore</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span><strong>Key alias:</strong> The name of the signing key within the keystore</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span><strong>Key password:</strong> Password for the specific key</span>
                          </li>
                        </ul>
                        <p className="mt-2">
                          <strong>Note:</strong> Google Play Console can manage app signing for you. After your first upload, you can find your "App signing key certificate" in Play Console under Release → Setup → App signing. Keep your upload key secure and never share it.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h5 className="font-semibold mb-2 text-sm">Where to Find Your AAB</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        Common output locations for the generated AAB file:
                      </p>
                      <ul className="text-sm text-muted-foreground ml-4 space-y-1">
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <code className="text-xs bg-muted px-1 py-0.5 rounded">app/build/outputs/bundle/release/app-release.aab</code>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <code className="text-xs bg-muted px-1 py-0.5 rounded">app/release/app-release.aab</code>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Check the Android Studio build output window for the exact path</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Alert className="bg-green-600/5 border-green-600/20">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertTitle>Ready for Play Store Upload</AlertTitle>
                    <AlertDescription>
                      Once you have your signed release AAB, upload it to Google Play Console under Release → Production → Create new release. The AAB file is only for Play Store submission and cannot be installed directly on devices like an APK.
                    </AlertDescription>
                  </Alert>
                </div>

                {/* APK Download Link */}
                <Alert className="bg-primary/5 border-primary/20">
                  <Download className="h-4 w-4 text-primary" />
                  <AlertTitle>Ready to distribute your APK?</AlertTitle>
                  <AlertDescription className="mt-2">
                    <p className="mb-3 text-sm">
                      Learn how to host your APK file for direct download and provide installation instructions to your users.
                    </p>
                    <Button asChild size="sm" className="w-full sm:w-auto">
                      <Link to="/apk-download">
                        <Download className="mr-2 h-4 w-4" />
                        View APK Download Guide
                      </Link>
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>

              {/* Play Store Metadata Section */}
              <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Play Store Metadata
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Copy and paste these details when submitting to Google Play Console.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">App Name</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(playStoreMetadata.appName, 'appName')}
                        className="h-8"
                      >
                        {copiedField === 'appName' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3 text-sm">
                      {playStoreMetadata.appName}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Short Description (80 chars max)</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(playStoreMetadata.shortDescription, 'shortDesc')}
                        className="h-8"
                      >
                        {copiedField === 'shortDesc' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3 text-sm">
                      {playStoreMetadata.shortDescription}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Full Description (4000 chars max)</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(playStoreMetadata.fullDescription, 'fullDesc')}
                        className="h-8"
                      >
                        {copiedField === 'fullDesc' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3 text-sm whitespace-pre-wrap max-h-64 overflow-y-auto">
                      {playStoreMetadata.fullDescription}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium block mb-2">Category</label>
                      <div className="rounded-lg bg-muted/50 p-3 text-sm">
                        {playStoreMetadata.category}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Content Rating</label>
                      <div className="rounded-lg bg-muted/50 p-3 text-sm">
                        {playStoreMetadata.contentRating}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Required URLs</label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Privacy Policy</p>
                          <p className="text-sm font-mono">{playStoreMetadata.privacyPolicyUrl}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(playStoreMetadata.privacyPolicyUrl, 'privacy')}
                        >
                          {copiedField === 'privacy' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Terms of Service</p>
                          <p className="text-sm font-mono">{playStoreMetadata.termsUrl}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(playStoreMetadata.termsUrl, 'terms')}
                        >
                          {copiedField === 'terms' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Support URL</p>
                          <p className="text-sm font-mono">{playStoreMetadata.supportUrl}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(playStoreMetadata.supportUrl, 'support')}
                        >
                          {copiedField === 'support' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branding Assets Section */}
              <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <Image className="h-5 w-5 text-primary" />
                    Branding Assets
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Download these pre-generated assets for your Play Store listing.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <div>
                      <p className="font-medium text-sm">App Icon (512×512)</p>
                      <p className="text-xs text-muted-foreground">High-resolution icon for Play Store</p>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <a href="/assets/generated/app-icon-s.dim_512x512.png" download>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <div>
                      <p className="font-medium text-sm">Feature Graphic (1024×500)</p>
                      <p className="text-xs text-muted-foreground">Banner for Play Store listing</p>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <a href="/assets/generated/play-store-feature-graphic.dim_1024x500.png" download>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <div>
                      <p className="font-medium text-sm">Screenshots (1080×1920)</p>
                      <p className="text-xs text-muted-foreground">4 phone screenshots for Play Store</p>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <a href="/assets/generated/play-store-screenshot-1.dim_1080x1920.png" download>
                          1
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href="/assets/generated/play-store-screenshot-2.dim_1080x1920.png" download>
                          2
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href="/assets/generated/play-store-screenshot-3.dim_1080x1920.png" download>
                          3
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href="/assets/generated/play-store-screenshot-4.dim_1080x1920.png" download>
                          4
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* iOS Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500/10">
                  <Apple className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
                <div>
                  <CardTitle>Option 3: iOS Wrapper App (App Store)</CardTitle>
                  <CardDescription>Package your website as a native iOS app</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Similar to Android, you can wrap your website in a native iOS container using WKWebView 
                or tools like Capacitor. This requires a Mac with Xcode and an Apple Developer account ($99/year).
              </p>

              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="mb-2 font-semibold text-sm">Requirements:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Mac computer with Xcode installed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Apple Developer Program membership ($99/year)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>iOS wrapper project (WKWebView, Capacitor, or Cordova)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>App Store Connect account for submission</span>
                  </li>
                </ul>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>App Store Review Guidelines</AlertTitle>
                <AlertDescription>
                  Apple has strict review guidelines. Wrapper apps must provide significant functionality 
                  beyond just displaying a website. Ensure your app offers a native-like experience and 
                  follows Apple's Human Interface Guidelines.
                </AlertDescription>
              </Alert>

              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a href="https://developer.apple.com/app-store/review/guidelines/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View App Store Guidelines
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
