import { Link, useNavigate } from '@tanstack/react-router';
import { useGetCart, useUpdateCartItem, useGetAllActiveProducts } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import AuthGuard from '../components/AuthGuard';

function CartPageContent() {
  const navigate = useNavigate();
  const { data: cart = [], isLoading: cartLoading } = useGetCart();
  const { data: products = [], isLoading: productsLoading } = useGetAllActiveProducts();
  const updateCartItem = useUpdateCartItem();

  const isLoading = cartLoading || productsLoading;

  const cartWithProducts = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product };
  }).filter((item) => item.product);

  const subtotal = cartWithProducts.reduce(
    (sum, item) => sum + Number(item.product!.priceCents) * Number(item.quantity),
    0
  );

  const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
    try {
      await updateCartItem.mutateAsync({ productId, quantity: newQuantity });
      if (newQuantity === 0) {
        toast.success('Item removed from cart');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update cart');
    }
  };

  if (isLoading) {
    return (
      <div className="page-section">
        <div className="container-custom max-w-4xl">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="page-section">
        <div className="container-custom max-w-4xl">
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start shopping to add items to your cart
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-section">
      <div className="container-custom max-w-4xl">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>

        <h1 className="text-3xl font-bold tracking-tight mb-6">Shopping Cart</h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* Cart Items */}
          <div className="space-y-4">
            {cartWithProducts.map((item) => (
              <Card key={item.productId}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Link to="/products/$productId" params={{ productId: String(item.product!.id) }} className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-md overflow-hidden bg-muted">
                        <img
                          src={item.product!.imageUrl}
                          alt={item.product!.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to="/products/$productId" params={{ productId: String(item.product!.id) }}>
                        <h3 className="font-semibold hover:text-primary transition-colors">
                          {item.product!.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        ${(Number(item.product!.priceCents) / 100).toFixed(2)} each
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateQuantity(item.productId, Number(item.quantity) - 1)}
                            disabled={updateCartItem.isPending}
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            max={item.product!.stock}
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 1;
                              handleUpdateQuantity(item.productId, Math.max(1, Math.min(item.product!.stock, val)));
                            }}
                            className="w-16 text-center"
                            disabled={updateCartItem.isPending}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateQuantity(item.productId, Number(item.quantity) + 1)}
                            disabled={updateCartItem.isPending || Number(item.quantity) >= item.product!.stock}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleUpdateQuantity(item.productId, 0)}
                          disabled={updateCartItem.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        ${((Number(item.product!.priceCents) * Number(item.quantity)) / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
                    <span>${(subtotal / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${(subtotal / 100).toFixed(2)}</span>
                </div>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => navigate({ to: '/checkout' })}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <AuthGuard message="Please sign in to view your cart.">
      <CartPageContent />
    </AuthGuard>
  );
}
