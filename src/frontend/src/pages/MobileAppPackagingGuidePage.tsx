import { Package, Smartphone, Download, ExternalLink, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSiteOrigin } from '@/utils/siteOrigin';
import { copyToClipboard } from '@/utils/clipboard';
import { useState } from 'react';

export default function MobileAppPackagingGuidePage() {
  const siteOrigin = getSiteOrigin();
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopySuccess(id);
      setTimeout(() => setCopySuccess(null), 2000);
    }
  };

  const privacyUrl = siteOrigin ? `${siteOrigin}/privacy` : '[Your domain]/privacy';
  const termsUrl = siteOrigin ? `${siteOrigin}/terms` : '[Your domain]/terms';
  const supportUrl = siteOrigin ? `${siteOrigin}/support` : '[Your domain]/support';

  return (
    <div className="container-custom py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Package className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="mb-3 text-4xl font-bold">Mobile App Packaging Guide</h1>
          <p className="text-lg text-muted-foreground">
            Complete guide to packaging Strager for Android and iOS app stores
          </p>
        </div>

        {/* SSR Notice */}
        {!siteOrigin && (
          <Alert className="mb-8">
            <Info className="h-4 w-4" />
            <AlertTitle>URLs Available in Browser Only</AlertTitle>
            <AlertDescription>
              Some URLs and copy features on this page are generated based on your current domain and are only available when viewing in a browser.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="pwa" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pwa">PWA Install</TabsTrigger>
            <TabsTrigger value="android">Android (APK/AAB)</TabsTrigger>
            <TabsTrigger value="ios">iOS Wrapper</TabsTrigger>
          </TabsList>

          {/* PWA Tab */}
          <TabsContent value="pwa" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progressive Web App (PWA)</CardTitle>
                <CardDescription>
                  Install Strager directly from the browser without app store submission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Easiest Option</AlertTitle>
                  <AlertDescription>
                    PWA installation requires no additional build steps. Users can install directly from their browser.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <h3 className="font-semibold">How Users Install:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Visit your app URL in Chrome (Android) or Safari (iOS)</li>
                    <li>Tap the browser menu (⋮ or share icon)</li>
                    <li>Select "Install app" or "Add to Home Screen"</li>
                    <li>The app icon appears on their home screen</li>
                  </ol>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold">Benefits:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>No app store approval process</li>
                    <li>Instant updates when you deploy</li>
                    <li>Works on both Android and iOS</li>
                    <li>Smaller download size</li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold">Limitations:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Not discoverable in app stores</li>
                    <li>Limited access to some native device features</li>
                    <li>Users must know your URL to install</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Android Tab */}
          <TabsContent value="android" className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>External Tooling Required</AlertTitle>
              <AlertDescription>
                Creating Android APK/AAB files requires Android Studio and the Android wrapper project. 
                This is separate from PWA installation.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Android APK (Direct Installation)</CardTitle>
                <CardDescription>
                  Build an APK file for direct installation on Android devices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold">Prerequisites:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Android Studio installed</li>
                    <li>Android wrapper project (TWA or Capacitor)</li>
                    <li>Your app URL configured in the wrapper</li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold">Build Steps:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Open your Android wrapper project in Android Studio</li>
                    <li>Update the app URL to point to your deployed app</li>
                    <li>Go to Build → Build Bundle(s) / APK(s) → Build APK(s)</li>
                    <li>Wait for the build to complete</li>
                    <li>Find the APK in <code className="bg-muted px-1 py-0.5 rounded text-xs">app/build/outputs/apk/</code></li>
                  </ol>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold">Distribution:</h3>
                  <p className="text-sm text-muted-foreground">
                    Place your APK file in <code className="bg-muted px-1 py-0.5 rounded text-xs">frontend/public/downloads/</code> and 
                    share the download link with users.
                  </p>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href="/apk-download">
                      <Download className="mr-2 h-4 w-4" />
                      View APK Download Page
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Android AAB (Play Store Upload)</CardTitle>
                <CardDescription>
                  Build an Android App Bundle for Google Play Store submission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Important: AAB vs APK</AlertTitle>
                  <AlertDescription>
                    AAB files cannot be converted from APK files. You must build an AAB directly from your Android wrapper project. 
                    APKs are for direct installation; AABs are for Play Store upload only.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <h3 className="font-semibold">Build Steps:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Open your Android wrapper project in Android Studio</li>
                    <li>Update the app URL to point to your deployed app</li>
                    <li>Go to Build → Generate Signed Bundle / APK</li>
                    <li>Select "Android App Bundle"</li>
                    <li>Create or select your signing key</li>
                    <li>Choose "release" build variant</li>
                    <li>Wait for the build to complete</li>
                    <li>Find the AAB in <code className="bg-muted px-1 py-0.5 rounded text-xs">app/build/outputs/bundle/release/</code></li>
                  </ol>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold">Play Store Submission:</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload your AAB to Google Play Console for distribution through the Play Store.
                  </p>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href="/aab-download">
                      <Download className="mr-2 h-4 w-4" />
                      View AAB Download Page
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Play Store Metadata</CardTitle>
                <CardDescription>
                  Required information for Google Play Store listing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold">App Details:</h3>
                  <div className="rounded-lg border bg-muted/30 p-4 space-y-3 text-sm">
                    <div>
                      <p className="font-medium">App Name:</p>
                      <p className="text-muted-foreground">Strager</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="font-medium">Short Description:</p>
                      <p className="text-muted-foreground">Your online marketplace for buying and selling products</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="font-medium">Category:</p>
                      <p className="text-muted-foreground">Shopping</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold">Required URLs:</h3>
                  {siteOrigin ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 rounded-lg border bg-background p-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-muted-foreground">Privacy Policy:</p>
                          <code className="text-xs break-all">{privacyUrl}</code>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(privacyUrl, 'privacy')}
                        >
                          {copySuccess === 'privacy' ? <CheckCircle2 className="h-4 w-4" /> : 'Copy'}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between gap-2 rounded-lg border bg-background p-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-muted-foreground">Terms of Service:</p>
                          <code className="text-xs break-all">{termsUrl}</code>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(termsUrl, 'terms')}
                        >
                          {copySuccess === 'terms' ? <CheckCircle2 className="h-4 w-4" /> : 'Copy'}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between gap-2 rounded-lg border bg-background p-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-muted-foreground">Support/Contact:</p>
                          <code className="text-xs break-all">{supportUrl}</code>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(supportUrl, 'support')}
                        >
                          {copySuccess === 'support' ? <CheckCircle2 className="h-4 w-4" /> : 'Copy'}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        URL copy functionality is available when viewing this page in a browser.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Branding Assets</CardTitle>
                <CardDescription>
                  Graphics and screenshots for your Play Store listing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold">Available Assets:</h3>
                  <div className="grid gap-3">
                    <div className="rounded-lg border bg-muted/30 p-3">
                      <p className="text-sm font-medium">App Icon (512×512)</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <code className="bg-muted px-1 py-0.5 rounded">/assets/generated/app-icon-s.dim_512x512.png</code>
                      </p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-3">
                      <p className="text-sm font-medium">Feature Graphic (1024×500)</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <code className="bg-muted px-1 py-0.5 rounded">/assets/generated/play-store-feature-graphic.dim_1024x500.png</code>
                      </p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-3">
                      <p className="text-sm font-medium">Screenshots (1080×1920)</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <code className="bg-muted px-1 py-0.5 rounded">/assets/generated/play-store-screenshot-[1-4].dim_1080x1920.png</code>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* iOS Tab */}
          <TabsContent value="ios" className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Requires macOS and Xcode</AlertTitle>
              <AlertDescription>
                Building iOS apps requires a Mac computer with Xcode installed and an Apple Developer account ($99/year).
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>iOS App Wrapper</CardTitle>
                <CardDescription>
                  Package your web app as a native iOS application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold">Prerequisites:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Mac computer with macOS</li>
                    <li>Xcode installed from the Mac App Store</li>
                    <li>Apple Developer account (for App Store submission)</li>
                    <li>iOS wrapper project (Capacitor recommended)</li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold">Recommended Approach: Capacitor</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Install Capacitor: <code className="bg-muted px-1 py-0.5 rounded text-xs">npm install @capacitor/core @capacitor/ios</code></li>
                    <li>Initialize Capacitor in your project</li>
                    <li>Add iOS platform: <code className="bg-muted px-1 py-0.5 rounded text-xs">npx cap add ios</code></li>
                    <li>Build your web app: <code className="bg-muted px-1 py-0.5 rounded text-xs">npm run build</code></li>
                    <li>Copy web assets: <code className="bg-muted px-1 py-0.5 rounded text-xs">npx cap copy ios</code></li>
                    <li>Open in Xcode: <code className="bg-muted px-1 py-0.5 rounded text-xs">npx cap open ios</code></li>
                    <li>Configure signing and capabilities in Xcode</li>
                    <li>Build and archive for App Store submission</li>
                  </ol>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold">App Store Submission:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Create an App Store Connect record for your app</li>
                    <li>Prepare app metadata, screenshots, and description</li>
                    <li>Archive your app in Xcode (Product → Archive)</li>
                    <li>Upload to App Store Connect via Xcode Organizer</li>
                    <li>Submit for review</li>
                  </ol>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Review Process</AlertTitle>
                  <AlertDescription>
                    Apple's review process typically takes 1-3 days. Ensure your app meets all App Store guidelines before submission.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Helpful Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <a href="https://capacitorjs.com/docs/ios" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Capacitor iOS Documentation
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <a href="https://developer.apple.com/app-store/review/guidelines/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    App Store Review Guidelines
                  </a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
