import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetCart, useGetAllActiveProducts, useCreateOrder } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import AuthGuard from '../components/AuthGuard';
import type { ShippingAddress } from '../backend';

function CheckoutPageContent() {
  const navigate = useNavigate();
  const { data: cart = [] } = useGetCart();
  const { data: products = [] } = useGetAllActiveProducts();
  const createOrder = useCreateOrder();

  const [formData, setFormData] = useState<ShippingAddress>({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: '',
  });

  const cartWithProducts = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product };
  }).filter((item) => item.product);

  const subtotal = cartWithProducts.reduce(
    (sum, item) => sum + Number(item.product!.priceCents) * Number(item.quantity),
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.street.trim() || !formData.city.trim() ||
        !formData.state.trim() || !formData.zipCode.trim() || !formData.country.trim() ||
        !formData.phoneNumber.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const order = await createOrder.mutateAsync({
        cartItems: cart,
        shippingAddress: formData,
      });
      toast.success('Order placed successfully!');
      navigate({ to: `/order-confirmation/${order.id}` });
    } catch (error: any) {
      toast.error(error.message || 'Failed to place order');
    }
  };

  if (cart.length === 0) {
    navigate({ to: '/cart' });
    return null;
  }

  return (
    <div className="page-section">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
            {/* Shipping Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address *</Label>
                    <Input
                      id="street"
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Postal Code *</Label>
                      <Input
                        id="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      />
                    </div>
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
                  <div className="space-y-3">
                    {cartWithProducts.map((item) => (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.product!.name} × {item.quantity}
                        </span>
                        <span>
                          ${((Number(item.product!.priceCents) * Number(item.quantity)) / 100).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${(subtotal / 100).toFixed(2)}</span>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={createOrder.isPending}
                  >
                    {createOrder.isPending ? 'Placing Order...' : 'Place Order'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <AuthGuard message="Please sign in to checkout.">
      <CheckoutPageContent />
    </AuthGuard>
  );
}
