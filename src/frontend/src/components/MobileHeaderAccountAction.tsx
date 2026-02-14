import { Link } from '@tanstack/react-router';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function MobileHeaderAccountAction() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <Button variant="ghost" size="icon" asChild>
      <Link to={isAuthenticated ? '/account/orders' : '/'}>
        <User className="h-5 w-5" />
      </Link>
    </Button>
  );
}
