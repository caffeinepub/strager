import { useState } from 'react';
import { useGetAllActiveProducts, useCreateProduct, useUpdateProduct, useDeactivateProduct, useGetCategories } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Store, Plus } from 'lucide-react';
import { toast } from 'sonner';
import AuthGuard from '../components/AuthGuard';
import ProductForm from '../components/ProductForm';
import type { Product, ProductInput } from '../backend';

function SellerDashboardPageContent() {
  const { identity } = useInternetIdentity();
  const { data: allProducts = [], isLoading } = useGetAllActiveProducts();
  const { data: categories = [] } = useGetCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deactivateProduct = useDeactivateProduct();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const myProducts = allProducts.filter(
    (p) => identity && p.seller.toString() === identity.getPrincipal().toString()
  );

  const handleCreate = async (productInput: ProductInput) => {
    try {
      await createProduct.mutateAsync(productInput);
      toast.success('Product created successfully!');
      setIsCreateDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create product');
    }
  };

  const handleUpdate = async (productInput: ProductInput) => {
    if (!editingProduct) return;
    try {
      await updateProduct.mutateAsync({ productId: editingProduct.id, productInput });
      toast.success('Product updated successfully!');
      setEditingProduct(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update product');
    }
  };

  const handleDeactivate = async (productId: number) => {
    if (!confirm('Are you sure you want to deactivate this product?')) return;
    try {
      await deactivateProduct.mutateAsync(productId);
      toast.success('Product deactivated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to deactivate product');
    }
  };

  if (isLoading) {
    return (
      <div className="page-section">
        <div className="container-custom">
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-section">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Store className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Seller Dashboard</h1>
              <p className="text-muted-foreground">Manage your product listings</p>
            </div>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Product</DialogTitle>
              </DialogHeader>
              <ProductForm
                categories={categories}
                onSubmit={handleCreate}
                onCancel={() => setIsCreateDialogOpen(false)}
                isSubmitting={createProduct.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        {myProducts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Store className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No products yet</h2>
              <p className="text-muted-foreground mb-6">
                Start selling by creating your first product listing
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Product
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-0">
                  <div className="aspect-square relative bg-muted">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge
                      variant={product.isActive ? 'default' : 'secondary'}
                      className="absolute top-2 right-2"
                    >
                      {product.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        ${(Number(product.priceCents) / 100).toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Stock: {product.stock}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setEditingProduct(product)}
                      >
                        Edit
                      </Button>
                      {product.isActive && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeactivate(product.id)}
                          disabled={deactivateProduct.isPending}
                        >
                          Deactivate
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            {editingProduct && (
              <ProductForm
                categories={categories}
                initialData={{
                  name: editingProduct.name,
                  description: editingProduct.description,
                  priceCents: editingProduct.priceCents,
                  categoryId: editingProduct.category.id,
                  imageUrl: editingProduct.imageUrl,
                  stock: editingProduct.stock,
                }}
                onSubmit={handleUpdate}
                onCancel={() => setEditingProduct(null)}
                isSubmitting={updateProduct.isPending}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default function SellerDashboardPage() {
  return (
    <AuthGuard message="Please sign in to access the seller dashboard.">
      <SellerDashboardPageContent />
    </AuthGuard>
  );
}
