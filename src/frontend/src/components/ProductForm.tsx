import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Category, ProductInput } from '../backend';

interface ProductFormProps {
  categories: Category[];
  initialData?: ProductInput;
  onSubmit: (data: ProductInput) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const AVAILABLE_IMAGES = [
  '/assets/generated/category-fashion.dim_256x256.png',
  '/assets/generated/category-electronics.dim_256x256.png',
  '/assets/generated/category-home-kitchen.dim_256x256.png',
  '/assets/generated/category-beauty.dim_256x256.png',
];

export default function ProductForm({ categories, initialData, onSubmit, onCancel, isSubmitting }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductInput>(
    initialData || {
      name: '',
      description: '',
      priceCents: 0,
      categoryId: categories[0]?.id || 0,
      imageUrl: AVAILABLE_IMAGES[0],
      stock: 0,
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter product name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your product"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($) *</Label>
          <Input
            id="price"
            type="number"
            required
            min="0"
            step="0.01"
            value={(formData.priceCents / 100).toFixed(2)}
            onChange={(e) =>
              setFormData({ ...formData, priceCents: Math.round(parseFloat(e.target.value || '0') * 100) })
            }
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock *</Label>
          <Input
            id="stock"
            type="number"
            required
            min="0"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Select
          value={String(formData.categoryId)}
          onValueChange={(value) => setFormData({ ...formData, categoryId: parseInt(value) })}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Product Image *</Label>
        <RadioGroup value={formData.imageUrl} onValueChange={(value) => setFormData({ ...formData, imageUrl: value })}>
          <div className="grid grid-cols-2 gap-4">
            {AVAILABLE_IMAGES.map((imageUrl) => (
              <div key={imageUrl} className="relative">
                <RadioGroupItem value={imageUrl} id={imageUrl} className="peer sr-only" />
                <Label
                  htmlFor={imageUrl}
                  className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <img src={imageUrl} alt="Product" className="w-full aspect-square object-cover rounded" />
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : initialData ? 'Update Product' : 'Create Product'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
