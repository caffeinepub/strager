import { useState, useMemo } from 'react';
import { Link, useSearch } from '@tanstack/react-router';
import { useGetAllActiveProducts, useGetCategories } from '../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';

export default function ProductsPage() {
  const search = useSearch({ strict: false }) as { q?: string; category?: number };
  const { data: products = [], isLoading: productsLoading } = useGetAllActiveProducts();
  const { data: categories = [] } = useGetCategories();

  const [searchQuery, setSearchQuery] = useState(search.q || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    search.category ? String(search.category) : 'all'
  );
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => String(p.category.id) === selectedCategory);
    }

    // Price range filter
    const min = minPrice ? parseFloat(minPrice) * 100 : 0;
    const max = maxPrice ? parseFloat(maxPrice) * 100 : Infinity;
    filtered = filtered.filter((p) => {
      const price = Number(p.priceCents);
      return price >= min && price <= max;
    });

    return filtered;
  }, [products, searchQuery, selectedCategory, minPrice, maxPrice]);

  return (
    <div className="page-section">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
          <p className="text-muted-foreground mt-2">
            Browse our complete collection of {products.length} products
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Filters Sidebar */}
          <aside className="space-y-6">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={String(cat.id)}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div>
            {productsLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(9)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4 space-y-3">
                      <Skeleton className="aspect-square rounded-md" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <Link key={product.id} to="/products/$productId" params={{ productId: String(product.id) }}>
                      <Card className="h-full overflow-hidden transition-all hover:shadow-md hover:scale-105">
                        <CardContent className="p-0">
                          <div className="aspect-square relative bg-muted">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4 space-y-2">
                            <h3 className="font-semibold line-clamp-2 min-h-[2.5rem]">
                              {product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {product.description}
                            </p>
                            <p className="text-2xl font-bold text-primary">
                              ${(Number(product.priceCents) / 100).toFixed(2)}
                            </p>
                            {product.stock > 0 ? (
                              <p className="text-sm text-muted-foreground">
                                {product.stock} in stock
                              </p>
                            ) : (
                              <p className="text-sm text-destructive">Out of stock</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
