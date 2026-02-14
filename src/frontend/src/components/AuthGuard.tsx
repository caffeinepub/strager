import { ReactNode } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';

interface AuthGuardProps {
  children: ReactNode;
  message?: string;
}

export default function AuthGuard({ children, message = 'You need to sign in to access this page.' }: AuthGuardProps) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container-custom page-section">
        <div className="max-w-md mx-auto">
          <Alert>
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Authentication Required</AlertTitle>
            <AlertDescription className="mt-2 space-y-4">
              <p>{message}</p>
              <Button 
                onClick={login} 
                disabled={loginStatus === 'logging-in'}
                className="w-full"
              >
                {loginStatus === 'logging-in' ? 'Signing in...' : 'Sign In'}
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
