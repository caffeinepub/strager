import { useState } from 'react';
import { useParams, useNavigate, Link } from '@tanstack/react-router';
import { useGetProduct, useAddToCart } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShoppingCart, ArrowLeft, Package } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { productId } = useParams({ strict: false }) as { productId: string };
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: product, isLoading, error } = useGetProduct(Number(productId));
  const addToCart = useAddToCart();

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart');
      return;
    }

    if (!product) return;

    if (quantity > product.stock) {
      toast.error('Quantity exceeds available stock');
      return;
    }

    try {
      await addToCart.mutateAsync({ productId: product.id, quantity });
      toast.success('Added to cart!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to add to cart');
    }
  };

  if (isLoading) {
    return (
      <div className="page-section">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-2">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-section">
        <div className="container-custom">
          <Alert variant="destructive">
            <AlertDescription>
              Product not found or an error occurred.
            </AlertDescription>
          </Alert>
          <Button className="mt-4" variant="outline" asChild>
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-section">
      <div className="container-custom">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category.name}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">
                ${(Number(product.priceCents) / 100).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              {product.stock > 0 ? (
                <span className="text-sm">
                  <span className="font-semibold">{product.stock}</span> in stock
                </span>
              ) : (
                <span className="text-sm text-destructive font-semibold">Out of stock</span>
              )}
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </CardContent>
            </Card>

            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                    className="w-24"
                  />
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={addToCart.isPending || !isAuthenticated}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {addToCart.isPending ? 'Adding...' : 'Add to Cart'}
                </Button>

                {!isAuthenticated && (
                  <p className="text-sm text-muted-foreground text-center">
                    Please sign in to add items to cart
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
