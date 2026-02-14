import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingCart, Search, Menu, Store, Package, Home, User, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import LoginButton from './LoginButton';
import SettingsMenu from './SettingsMenu';
import MobileHeaderAccountAction from './MobileHeaderAccountAction';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCart } from '../hooks/useQueries';
import { useState } from 'react';
import { BRAND_COPY } from '../content/brandCopy';

export default function Header() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: cart = [] } = useGetCart();
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemCount = cart.reduce((sum, item) => sum + Number(item.quantity), 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: '/products', search: { q: searchQuery } });
    }
  };

  const scrollToCategories = () => {
    if (window.location.pathname === '/') {
      const categoriesSection = document.getElementById('categories-section');
      if (categoriesSection) {
        categoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate({ to: '/', search: { scrollTo: 'categories' } });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/assets/generated/marketplace-logo.dim_512x128.png" 
                alt={BRAND_COPY.appName}
                className="h-8 w-auto"
              />
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={BRAND_COPY.searchPlaceholder}
                  className="w-full pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {/* Desktop Navigation */}
            <nav className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/products">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Buy
                </Link>
              </Button>
              {isAuthenticated && (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/seller/dashboard">
                      <Store className="mr-2 h-4 w-4" />
                      Sell
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/account/orders">
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </Button>
                </>
              )}
              <Button variant="ghost" className="relative" asChild>
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                      {cartItemCount}
                    </Badge>
                  )}
                </Link>
              </Button>
              <LoginButton />
              <SettingsMenu />
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Header - Two Row Layout */}
      <div className="md:hidden">
        {/* Top Bar: Menu + Logo + Account + Cart */}
        <div className="flex h-14 items-center justify-between gap-2 px-3 border-b">
          {/* Left: Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/products">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Buy
                  </Link>
                </Button>
                {isAuthenticated && (
                  <>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/seller/dashboard">
                        <Store className="mr-2 h-4 w-4" />
                        Seller Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/account/orders">
                        <Package className="mr-2 h-4 w-4" />
                        My Orders
                      </Link>
                    </Button>
                  </>
                )}
                <LoginButton />
              </nav>
            </SheetContent>
          </Sheet>

          {/* Center: Logo */}
          <Link to="/" className="flex-1 flex justify-center">
            <img 
              src="/assets/generated/marketplace-logo.dim_512x128.png" 
              alt={BRAND_COPY.appName}
              className="h-7 w-auto"
            />
          </Link>

          {/* Right: Account + Cart */}
          <div className="flex items-center gap-1 shrink-0">
            <MobileHeaderAccountAction />
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>

        {/* Search Row: Full-width search with submit button */}
        <div className="px-3 py-2 bg-muted/30">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={BRAND_COPY.searchPlaceholderMobile}
                className="w-full pl-10 pr-3 h-10 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" size="icon" className="h-10 w-10 shrink-0 bg-primary hover:bg-primary/90">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Quick Links Row */}
        <div className="flex items-center gap-4 px-3 py-2 border-t bg-background overflow-x-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs whitespace-nowrap shrink-0"
            asChild
          >
            <Link to="/products">
              Buy
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs whitespace-nowrap shrink-0"
            onClick={scrollToCategories}
          >
            Shop by Category
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs whitespace-nowrap shrink-0"
            asChild
          >
            <Link to="/products" search={{ q: 'deal' }}>
              Deals
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs whitespace-nowrap shrink-0"
            asChild
          >
            <Link to="/seller/dashboard">
              Sell
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
