import { useParams, Link } from '@tanstack/react-router';
import { useGetOrder, useGetAllActiveProducts } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Package } from 'lucide-react';
import AuthGuard from '../components/AuthGuard';

function OrderDetailPageContent() {
  const { orderId } = useParams({ strict: false }) as { orderId: string };
  const { data: order, isLoading: orderLoading } = useGetOrder(Number(orderId));
  const { data: products = [], isLoading: productsLoading } = useGetAllActiveProducts();

  const isLoading = orderLoading || productsLoading;

  const getStatusVariant = (status: string): 'default' | 'secondary' | 'outline' => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'shipped':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="page-section">
        <div className="container-custom max-w-4xl">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="page-section">
        <div className="container-custom max-w-4xl text-center">
          <p className="text-muted-foreground">Order not found</p>
          <Button className="mt-4" asChild>
            <Link to="/account/orders">Back to Orders</Link>
          </Button>
        </div>
      </div>
    );
  }

  const orderItems = order.items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product };
  });

  return (
    <div className="page-section">
      <div className="container-custom max-w-4xl">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/account/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Order #{order.id}</h1>
              <Badge variant={getStatusVariant(order.status)} className="mt-1">
                {order.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* Order Items */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.productId} className="flex gap-4">
                    {item.product && (
                      <>
                        <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${(Number(item.product.priceCents) / 100).toFixed(2)} each
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ${((Number(item.product.priceCents) * Number(item.quantity)) / 100).toFixed(2)}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <p className="font-semibold">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="mt-2">{order.shippingAddress.phoneNumber}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${(Number(order.totalCents) / 100).toFixed(2)}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${(Number(order.totalCents) / 100).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderDetailPage() {
  return (
    <AuthGuard message="Please sign in to view order details.">
      <OrderDetailPageContent />
    </AuthGuard>
  );
}
