import { useParams, Link } from '@tanstack/react-router';
import { useGetOrder } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, Package } from 'lucide-react';
import AuthGuard from '../components/AuthGuard';

function OrderConfirmationPageContent() {
  const { orderId } = useParams({ strict: false }) as { orderId: string };
  const { data: order, isLoading } = useGetOrder(Number(orderId));

  if (isLoading) {
    return (
      <div className="page-section">
        <div className="container-custom max-w-2xl">
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="page-section">
        <div className="container-custom max-w-2xl text-center">
          <p className="text-muted-foreground">Order not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-section">
      <div className="container-custom max-w-2xl">
        <Card>
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
            <p className="text-muted-foreground mt-2">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">Order #{order.id}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Total: <span className="font-semibold text-foreground">${(Number(order.totalCents) / 100).toFixed(2)}</span>
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Shipping Address</h3>
              <div className="text-sm text-muted-foreground">
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p>{order.shippingAddress.phoneNumber}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="flex-1" asChild>
                <Link to="/account/orders/$orderId" params={{ orderId: String(order.id) }}>View Order Details</Link>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <AuthGuard message="Please sign in to view order confirmation.">
      <OrderConfirmationPageContent />
    </AuthGuard>
  );
}
