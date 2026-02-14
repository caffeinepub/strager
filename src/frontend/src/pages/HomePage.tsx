import { Link } from '@tanstack/react-router';
import { useGetAllActiveProducts, useGetCategories } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';
import LocationStrip from '../components/LocationStrip';
import PromoCarousel from '../components/PromoCarousel';
import QuickBenefitsRow from '../components/QuickBenefitsRow';
import { useScrollToAnchorOnRoute } from '../hooks/useScrollToAnchorOnRoute';

export default function HomePage() {
  const { data: products = [], isLoading: productsLoading } = useGetAllActiveProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useGetCategories();

  useScrollToAnchorOnRoute();

  const featuredProducts = products.slice(0, 8);

  const categoryImages: Record<string, string> = {
    'Clothing': '/assets/generated/category-fashion.dim_256x256.png',
    'Electronics': '/assets/generated/category-electronics.dim_256x256.png',
    'Home': '/assets/generated/category-home-kitchen.dim_256x256.png',
    'Toys': '/assets/generated/category-beauty.dim_256x256.png',
  };

  return (
    <div>
      {/* Location Strip */}
      <LocationStrip />

      {/* Promo Carousel Section */}
      <section className="py-6 bg-background">
        <div className="container-custom">
          <PromoCarousel />
        </div>
      </section>

      {/* Quick Benefits Row */}
      <section className="border-y bg-muted/20">
        <div className="container-custom">
          <QuickBenefitsRow />
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories-section" className="page-section bg-background">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
            <p className="text-muted-foreground mt-2">Browse our popular categories</p>
          </div>
          {categoriesLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to="/products"
                  search={{ category: category.id }}
                  className="group"
                >
                  <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-105">
                    <CardContent className="p-0">
                      <div className="aspect-square relative bg-gradient-to-br from-primary/5 to-accent/5">
                        <img
                          src={categoryImages[category.name] || '/assets/generated/category-fashion.dim_256x256.png'}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="page-section bg-muted/30">
        <div className="container-custom">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
              <p className="text-muted-foreground mt-2">Check out our top picks</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {productsLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="aspect-square rounded-md" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
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
          )}
        </div>
      </section>
    </div>
  );
}
