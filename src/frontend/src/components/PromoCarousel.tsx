import { Card } from '@/components/ui/card';
import PromoCard from './PromoCard';

const promoData = [
  {
    id: 1,
    title: 'All Under ₹299',
    subtitle: 'Get up to ₹150 cashback*',
    badge: 'Free Delivery',
    imageUrl: '/assets/generated/promo-card-1.dim_1200x800.png',
  },
  {
    id: 2,
    title: 'Mega Deals',
    subtitle: 'Save up to 70% on top brands',
    badge: 'Limited Time',
    imageUrl: '/assets/generated/promo-card-2.dim_1200x800.png',
  },
  {
    id: 3,
    title: 'Shop Smart',
    subtitle: 'Latest electronics at best prices',
    badge: 'New Arrivals',
    imageUrl: '/assets/generated/promo-card-3.dim_1200x800.png',
  },
];

export default function PromoCarousel() {
  return (
    <div className="w-full">
      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-4 pb-2">
          {promoData.map((promo) => (
            <div key={promo.id} className="w-[85vw] shrink-0">
              <PromoCard {...promo} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {promoData.map((promo) => (
          <PromoCard key={promo.id} {...promo} />
        ))}
      </div>
    </div>
  );
}
