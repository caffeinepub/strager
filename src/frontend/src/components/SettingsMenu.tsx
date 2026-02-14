import { Settings, Smartphone, Package, Download, FileArchive, Shield, FileText, HelpCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';

export default function SettingsMenu() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  // Hide installation section when authenticated and profile setup is required
  const showInstallationSection = !isAuthenticated || (isAuthenticated && isFetched && userProfile !== null);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Settings & Help</SheetTitle>
          <SheetDescription>
            App installation, guides, and legal information
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-1">
          {showInstallationSection && (
            <>
              <h3 className="mb-2 px-2 text-sm font-semibold text-muted-foreground">
                App Installation
              </h3>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/install">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Install App
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/mobile-app-packaging">
                  <Package className="mr-2 h-4 w-4" />
                  App Store Guide
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/apk-download">
                  <Download className="mr-2 h-4 w-4" />
                  Download APK
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/aab-download">
                  <FileArchive className="mr-2 h-4 w-4" />
                  Download AAB
                </Link>
              </Button>

              <Separator className="my-4" />
            </>
          )}

          <h3 className="mb-2 px-2 text-sm font-semibold text-muted-foreground">
            Legal & Support
          </h3>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/privacy">
              <Shield className="mr-2 h-4 w-4" />
              Privacy Policy
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/terms">
              <FileText className="mr-2 h-4 w-4" />
              Terms of Service
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/support">
              <HelpCircle className="mr-2 h-4 w-4" />
              Support
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
