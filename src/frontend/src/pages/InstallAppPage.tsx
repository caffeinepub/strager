import { Smartphone, Chrome, Share2, PlusSquare, Home, AlertCircle, RefreshCw, Trash2, Package } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function InstallAppPage() {
  return (
    <div className="container-custom py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl font-bold">Install Strager App</h1>
          <p className="text-lg text-muted-foreground">
            Get the full app experience on your phone. Follow the simple steps below.
          </p>
        </div>

        {/* Enhanced Link to Mobile App Packaging Guide */}
        <Alert className="mb-6 border-primary/30">
          <Package className="h-5 w-5" />
          <AlertTitle className="text-base">PWA Install vs APK Creation</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>
              The steps on this page are for installing the <strong>Progressive Web App (PWA)</strong> directly 
              from your browser — no app store needed.
            </p>
            <p>
              If you specifically want to create an <strong>APK file</strong> for local installation/testing 
              or submit to the Play Store, you must follow the external Android tooling steps in our 
              packaging guide.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-2">
              <Link to="/mobile-app-packaging">
                View Package as Mobile App Guide
              </Link>
            </Button>
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          {/* Android Instructions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Android (Chrome)</CardTitle>
                  <CardDescription>Install on your Android phone</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  1
                </div>
                <div>
                  <p className="font-medium">Open Chrome browser</p>
                  <p className="text-sm text-muted-foreground">
                    Make sure you're using Google Chrome on your Android phone.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  2
                </div>
                <div>
                  <p className="font-medium">Tap the menu (three dots)</p>
                  <p className="text-sm text-muted-foreground">
                    Look for the three dots in the top right corner of Chrome.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  3
                </div>
                <div className="flex items-start gap-2">
                  <div>
                    <p className="font-medium">Tap "Install app" or "Add to Home screen"</p>
                    <p className="text-sm text-muted-foreground">
                      You'll see a popup asking to install Strager.
                    </p>
                  </div>
                  <PlusSquare className="h-5 w-5 shrink-0 text-primary" />
                </div>
              </div>

              <Separator />

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  4
                </div>
                <div>
                  <p className="font-medium">Tap "Install"</p>
                  <p className="text-sm text-muted-foreground">
                    The app will be added to your home screen. Done!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* iPhone Instructions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>iPhone (Safari)</CardTitle>
                  <CardDescription>Install on your iPhone</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  1
                </div>
                <div>
                  <p className="font-medium">Open Safari browser</p>
                  <p className="text-sm text-muted-foreground">
                    Make sure you're using Safari on your iPhone (not Chrome).
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  2
                </div>
                <div className="flex items-start gap-2">
                  <div>
                    <p className="font-medium">Tap the Share button</p>
                    <p className="text-sm text-muted-foreground">
                      Look for the share icon at the bottom of Safari (square with arrow pointing up).
                    </p>
                  </div>
                  <Share2 className="h-5 w-5 shrink-0 text-primary" />
                </div>
              </div>

              <Separator />

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  3
                </div>
                <div className="flex items-start gap-2">
                  <div>
                    <p className="font-medium">Scroll and tap "Add to Home Screen"</p>
                    <p className="text-sm text-muted-foreground">
                      You may need to scroll down in the menu to find this option.
                    </p>
                  </div>
                  <Home className="h-5 w-5 shrink-0 text-primary" />
                </div>
              </div>

              <Separator />

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  4
                </div>
                <div>
                  <p className="font-medium">Tap "Add"</p>
                  <p className="text-sm text-muted-foreground">
                    The app will appear on your home screen. You're all set!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting Section */}
          <Card className="border-warning/30 bg-warning/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                  <AlertCircle className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <CardTitle>Troubleshooting (Icon Not Updating)</CardTitle>
                  <CardDescription>If the app icon doesn't update after a new version</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Android Troubleshooting */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <Smartphone className="h-5 w-5 text-primary" />
                  Android (Chrome)
                </h3>
                <div className="space-y-3 pl-7">
                  <div className="flex items-start gap-2">
                    <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Hard refresh the page</p>
                      <p className="text-xs text-muted-foreground">
                        In Chrome menu, tap "Refresh" or pull down to refresh
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Trash2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Clear site data</p>
                      <p className="text-xs text-muted-foreground">
                        Chrome menu → Settings → Site settings → Storage → Clear site data
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <PlusSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Uninstall and reinstall</p>
                      <p className="text-xs text-muted-foreground">
                        Long-press the app icon → Uninstall, then reinstall from Chrome
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* iPhone Troubleshooting */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <Smartphone className="h-5 w-5 text-primary" />
                  iPhone (Safari)
                </h3>
                <div className="space-y-3 pl-7">
                  <div className="flex items-start gap-2">
                    <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Close and reopen Safari</p>
                      <p className="text-xs text-muted-foreground">
                        Swipe up from bottom, close Safari, then reopen and visit the site
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Trash2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Remove from Home Screen</p>
                      <p className="text-xs text-muted-foreground">
                        Long-press the app icon → Remove App → Delete
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Trash2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Clear website data</p>
                      <p className="text-xs text-muted-foreground">
                        Settings → Safari → Advanced → Website Data → find site → Swipe left → Delete
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Home className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Re-add to Home Screen</p>
                      <p className="text-xs text-muted-foreground">
                        Visit the site in Safari and follow the install steps again
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Card */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">Why Install?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Quick access from your home screen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Works like a native app</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Faster loading times</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Works offline (basic features)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
