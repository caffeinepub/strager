import { useState, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { User, Mail, Store } from 'lucide-react';

export default function ProfileSetupDialog() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [isSeller, setIsSeller] = useState(false);

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  useEffect(() => {
    if (!showProfileSetup) {
      setDisplayName('');
      setEmail('');
      setIsSeller(false);
    }
  }, [showProfileSetup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!displayName.trim()) {
      toast.error('Full name is required to continue');
      return;
    }

    try {
      await saveProfile.mutateAsync({
        displayName: displayName.trim(),
        email: email.trim(),
        isSeller,
      });
      toast.success('Your profile has been created successfully');
    } catch (error: any) {
      toast.error(error.message || 'Unable to create profile. Please try again.');
    }
  };

  return (
    <Dialog open={showProfileSetup}>
      <DialogContent className="sm:max-w-lg" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-semibold">Welcome to Strager</DialogTitle>
          <DialogDescription className="text-base">
            Please complete your profile to start exploring our marketplace
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="displayName"
                placeholder="Enter your full name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">
                This name will be visible to other users
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email Address <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">
                Receive order updates and important notifications
              </p>
            </div>

            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="isSeller"
                  checked={isSeller}
                  onCheckedChange={(checked) => setIsSeller(checked as boolean)}
                  className="mt-0.5"
                />
                <div className="flex-1 space-y-1">
                  <Label htmlFor="isSeller" className="text-sm font-medium cursor-pointer flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    Enable seller account
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Check this option if you plan to list and sell products on Strager
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button 
              type="submit" 
              className="w-full h-11 text-base font-medium" 
              disabled={saveProfile.isPending}
            >
              {saveProfile.isPending ? 'Creating your profile...' : 'Continue to Strager'}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
