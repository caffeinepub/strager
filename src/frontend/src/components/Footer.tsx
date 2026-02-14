import { Heart, Smartphone, Package } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'marketplace-app';

  return (
    <footer className="border-t bg-muted/30">
      <div className="container-custom py-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/install"
              className="flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors"
            >
              <Smartphone className="h-4 w-4" />
              Install App
            </Link>
            <span className="text-muted-foreground/50">•</span>
            <Link
              to="/mobile-app-packaging"
              className="flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors"
            >
              <Package className="h-4 w-4" />
              App Store Guide
            </Link>
            <span className="text-muted-foreground/50">•</span>
            <Link
              to="/privacy"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-muted-foreground/50">•</span>
            <Link
              to="/terms"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <span className="text-muted-foreground/50">•</span>
            <Link
              to="/support"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Support
            </Link>
          </div>
          <p>
            © {currentYear} Marketplace. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-4 w-4 fill-primary text-primary" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
