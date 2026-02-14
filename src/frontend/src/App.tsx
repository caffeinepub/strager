import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AccountOrdersPage from './pages/AccountOrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import InstallAppPage from './pages/InstallAppPage';
import MobileAppPackagingGuidePage from './pages/MobileAppPackagingGuidePage';
import ApkDownloadPage from './pages/ApkDownloadPage';
import AabDownloadPage from './pages/AabDownloadPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import SupportContactPage from './pages/SupportContactPage';
import ProfileSetupDialog from './components/ProfileSetupDialog';

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ProfileSetupDialog />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: ProductsPage,
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/$productId',
  component: ProductDetailPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage,
});

const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order-confirmation/$orderId',
  component: OrderConfirmationPage,
});

const accountOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/account/orders',
  component: AccountOrdersPage,
});

const orderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/account/orders/$orderId',
  component: OrderDetailPage,
});

const sellerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/seller/dashboard',
  component: SellerDashboardPage,
});

const installAppRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/install',
  component: InstallAppPage,
});

const mobileAppPackagingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mobile-app-packaging',
  component: MobileAppPackagingGuidePage,
});

const apkDownloadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/apk-download',
  component: ApkDownloadPage,
});

const aabDownloadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/aab-download',
  component: AabDownloadPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyPolicyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsOfServicePage,
});

const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/support',
  component: SupportContactPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  orderConfirmationRoute,
  accountOrdersRoute,
  orderDetailRoute,
  sellerDashboardRoute,
  installAppRoute,
  mobileAppPackagingRoute,
  apkDownloadRoute,
  aabDownloadRoute,
  privacyRoute,
  termsRoute,
  supportRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
