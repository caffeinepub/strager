import { Package, Smartphone, Apple, Chrome, Code2, FileCode, Image, Palette, CheckCircle2, ExternalLink, Copy, FileText, AlertTriangle } from 'lucide-react';
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
                              <span>How to verify the configuration is working correctly</span>
                            </li>
                          </ul>
                          <Alert variant="destructive" className="mt-3">
                            <AlertDescription className="text-xs">
                              <strong>Important:</strong> TWA will not work correctly until you replace these placeholders and deploy the updated assetlinks.json file. The file must be accessible at <code className="bg-destructive/10 px-1 py-0.5 rounded">{siteOrigin}/.well-known/assetlinks.json</code>
                            </AlertDescription>
                          </Alert>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Add app icons and assets</p>
                        <p className="text-sm text-muted-foreground">
                          Use the existing branding assets from this project (see "Branding Assets" section below). 
                          Generate all required Android icon sizes (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi) using tools 
                          like Android Asset Studio or Image Asset Studio in Android Studio.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                        5
                      </div>
                      <div>
                        <p className="font-medium">Generate a signing key</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Create a keystore file to sign your app (required for both APK and AAB):
                        </p>
                        <div className="rounded-lg bg-muted/50 p-3 text-xs font-mono">
                          <code>keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000</code>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Keep this keystore file secure — you'll need it for all future app updates.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                        6
                      </div>
                      <div>
                        <p className="font-medium">Build the APK or AAB</p>
                        <div className="space-y-3 mt-2">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">For local testing (APK):</p>
                            <div className="rounded-lg bg-muted/50 p-3 text-xs font-mono">
                              <code>./gradlew assembleRelease</code>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Output: <code className="bg-muted px-1 py-0.5 rounded">app/build/outputs/apk/release/app-release.apk</code>
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">For Play Store submission (AAB):</p>
                            <div className="rounded-lg bg-muted/50 p-3 text-xs font-mono">
                              <code>./gradlew bundleRelease</code>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Output: <code className="bg-muted px-1 py-0.5 rounded">app/build/outputs/bundle/release/app-release.aab</code>
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            <strong>Note:</strong> If using Android Studio, you can also use Build → Generate Signed Bundle / APK from the menu.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                        7
                      </div>
                      <div>
                        <p className="font-medium">Test your APK locally</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Install the APK on your Android device for testing:
                        </p>
                        <div className="rounded-lg bg-muted/50 p-3 text-xs font-mono">
                          <code>adb install app/build/outputs/apk/release/app-release.apk</code>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Or transfer the APK file to your device and install it manually (you may need to enable "Install from unknown sources" in device settings).
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                        8
                      </div>
                      <div>
                        <p className="font-medium">Submit AAB to Play Store</p>
                        <p className="text-sm text-muted-foreground">
                          Once testing is complete, create a Google Play Developer account ($25 one-time fee) at 
                          play.google.com/console, upload your AAB file, complete the store listing with metadata 
                          (see "Play Store Listing Info" section below), and submit for review.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="mb-2 font-semibold text-sm">Requirements:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Android development environment (Android Studio recommended)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Java Development Kit (JDK) 8 or higher</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Google Play Developer account ($25 one-time fee for Play Store submission)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Privacy policy URL (required by Play Store)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>App screenshots and promotional graphics</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* iOS Wrapper Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                  <Apple className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle>Option 3: iOS Wrapper App (App Store)</CardTitle>
                  <CardDescription>Package your website as a native iOS app</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                An iOS wrapper app uses WKWebView to display your website inside a native iOS container. 
                This allows you to publish to the Apple App Store.
              </p>

              <div>
                <h4 className="mb-3 font-semibold">Step-by-Step Guide:</h4>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-600 dark:text-blue-400">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Set up Xcode</p>
                      <p className="text-sm text-muted-foreground">
                        Download and install Xcode from the Mac App Store. You'll need a Mac computer 
                        to build iOS apps.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-600 dark:text-blue-400">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Create a new iOS project</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        In Xcode, create a new iOS App project and add a WKWebView that loads your website:
                      </p>
                      <div className="rounded-lg bg-muted/50 p-3 text-xs font-mono space-y-1">
                        <p><span className="text-muted-foreground">App Name:</span> Strager Marketplace</p>
                        <p><span className="text-muted-foreground">Bundle ID:</span> com.strager.marketplace (or your domain)</p>
                        <p><span className="text-muted-foreground">Website URL:</span> {siteOrigin}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-600 dark:text-blue-400">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Add app icons and assets</p>
                      <p className="text-sm text-muted-foreground">
                        Use the existing branding assets from this project (see section below). 
                        Generate all required iOS icon sizes using Xcode's Asset Catalog.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-600 dark:text-blue-400">
                      4
                    </div>
                    <div>
                      <p className="font-medium">Configure app capabilities</p>
                      <p className="text-sm text-muted-foreground">
                        Enable necessary capabilities in Xcode (e.g., network access, camera if needed). 
                        Update Info.plist with required permissions.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-600 dark:text-blue-400">
                      5
                    </div>
                    <div>
                      <p className="font-medium">Join Apple Developer Program</p>
                      <p className="text-sm text-muted-foreground">
                        Enroll in the Apple Developer Program ($99/year) at developer.apple.com. 
                        This is required to publish apps on the App Store.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-600 dark:text-blue-400">
                      6
                    </div>
                    <div>
                      <p className="font-medium">Build and archive</p>
                      <p className="text-sm text-muted-foreground">
                        In Xcode, select Product → Archive to create a build for distribution. 
                        This will prepare your app for App Store submission.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-600 dark:text-blue-400">
                      7
                    </div>
                    <div>
                      <p className="font-medium">Submit to App Store</p>
                      <p className="text-sm text-muted-foreground">
                        Use App Store Connect to upload your build, add store listing details, 
                        screenshots, and submit for review. Apple's review process typically takes 1-3 days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="mb-2 font-semibold text-sm">Requirements:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Mac computer with macOS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Xcode (free from Mac App Store)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Apple Developer Program membership ($99/year)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Privacy policy URL (required by App Store)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>App screenshots and promotional materials</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Play Store Listing Info Section */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Play Store Listing Info</CardTitle>
                  <CardDescription>Copy/paste-ready metadata for your Play Store submission</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Use these pre-written text blocks when filling out your Play Store listing in the Google Play Console.
              </p>

              {/* App Name */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">App Name</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(playStoreMetadata.appName, 'appName')}
                    className="h-8"
                  >
                    {copiedField === 'appName' ? (
                      <span className="text-xs text-green-600">Copied!</span>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </Button>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-sm">{playStoreMetadata.appName}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Max 50 characters</p>
              </div>

              <Separator />

              {/* Short Description */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">Short Description</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(playStoreMetadata.shortDescription, 'shortDesc')}
                    className="h-8"
                  >
                    {copiedField === 'shortDesc' ? (
                      <span className="text-xs text-green-600">Copied!</span>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </Button>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-sm">{playStoreMetadata.shortDescription}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Max 80 characters</p>
              </div>

              <Separator />

              {/* Full Description */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">Full Description</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(playStoreMetadata.fullDescription, 'fullDesc')}
                    className="h-8"
                  >
                    {copiedField === 'fullDesc' ? (
                      <span className="text-xs text-green-600">Copied!</span>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </Button>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 max-h-64 overflow-y-auto">
                  <p className="text-sm whitespace-pre-line">{playStoreMetadata.fullDescription}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Max 4000 characters</p>
              </div>

              <Separator />

              {/* Category & Content Rating */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Category</h4>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-sm">{playStoreMetadata.category}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Select in Play Console</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Content Rating</h4>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-sm">{playStoreMetadata.contentRating}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Complete questionnaire in Play Console</p>
                </div>
              </div>

              <Separator />

              {/* Required URLs */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Required URLs</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Privacy Policy URL</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(playStoreMetadata.privacyPolicyUrl, 'privacyUrl')}
                        className="h-7"
                      >
                        {copiedField === 'privacyUrl' ? (
                          <span className="text-xs text-green-600">Copied!</span>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            <span className="text-xs">Copy</span>
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-2">
                      <p className="text-xs font-mono break-all">{playStoreMetadata.privacyPolicyUrl}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Terms of Service URL</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(playStoreMetadata.termsUrl, 'termsUrl')}
                        className="h-7"
                      >
                        {copiedField === 'termsUrl' ? (
                          <span className="text-xs text-green-600">Copied!</span>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            <span className="text-xs">Copy</span>
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-2">
                      <p className="text-xs font-mono break-all">{playStoreMetadata.termsUrl}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Support/Contact URL</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(playStoreMetadata.supportUrl, 'supportUrl')}
                        className="h-7"
                      >
                        {copiedField === 'supportUrl' ? (
                          <span className="text-xs text-green-600">Copied!</span>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            <span className="text-xs">Copy</span>
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-2">
                      <p className="text-xs font-mono break-all">{playStoreMetadata.supportUrl}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Branding Assets Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Image className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Branding Assets</CardTitle>
                  <CardDescription>Use these assets for your app wrapper and store listings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                All assets are located in the <code className="text-xs bg-muted px-1 py-0.5 rounded">frontend/public/assets/generated/</code> directory.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-semibold text-sm flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-primary" />
                    App Icons
                  </h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• app-icon-s.dim_192x192.png</li>
                    <li>• app-icon-s.dim_512x512.png</li>
                    <li>• app-icon-s-maskable.dim_512x512.png</li>
                  </ul>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Use these as source files to generate platform-specific icon sizes.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-semibold text-sm flex items-center gap-2">
                    <Image className="h-4 w-4 text-primary" />
                    Logo
                  </h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• marketplace-logo.dim_512x128.png</li>
                  </ul>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Use for splash screens and branding.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-semibold text-sm flex items-center gap-2">
                    <Palette className="h-4 w-4 text-primary" />
                    Play Store Graphics
                  </h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• play-store-feature-graphic.dim_1024x500.png</li>
                    <li>• play-store-screenshot-1.dim_1080x1920.png</li>
                    <li>• play-store-screenshot-2.dim_1080x1920.png</li>
                    <li>• play-store-screenshot-3.dim_1080x1920.png</li>
                    <li>• play-store-screenshot-4.dim_1080x1920.png</li>
                  </ul>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Ready-to-upload Play Store listing images.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-semibold text-sm flex items-center gap-2">
                    <Palette className="h-4 w-4 text-primary" />
                    Theme Color
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg border" style={{ backgroundColor: '#ff6b35' }}></div>
                    <div>
                      <p className="text-xs font-mono">#ff6b35</p>
                      <p className="text-xs text-muted-foreground">Primary brand color</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Helpful Resources */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ExternalLink className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Helpful Resources</CardTitle>
                  <CardDescription>External tools and documentation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <a
                  href="https://www.pwabuilder.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-sm">PWABuilder</p>
                    <p className="text-xs text-muted-foreground">Automatically generate Android and iOS wrappers</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>

                <a
                  href="https://developer.android.com/studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-sm">Android Studio</p>
                    <p className="text-xs text-muted-foreground">Official Android development environment</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>

                <a
                  href="https://developer.android.com/training/articles/security-ssl#UnknownCa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-sm">Trusted Web Activity Guide</p>
                    <p className="text-xs text-muted-foreground">Official TWA documentation from Google</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>

                <a
                  href="https://play.google.com/console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-sm">Google Play Console</p>
                    <p className="text-xs text-muted-foreground">Publish and manage your Android app</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>

                <a
                  href="https://appstoreconnect.apple.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-sm">App Store Connect</p>
                    <p className="text-xs text-muted-foreground">Publish and manage your iOS app</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
