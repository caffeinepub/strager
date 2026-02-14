import { Truck, Shield, Tag, RotateCcw } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    label: 'Free Delivery',
  },
  {
    icon: Shield,
    label: 'Secure Payments',
  },
  {
    icon: Tag,
    label: 'Great Deals',
  },
  {
    icon: RotateCcw,
    label: 'Easy Returns',
  },
];

export default function QuickBenefitsRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 py-6">
      {benefits.map((benefit) => (
        <div key={benefit.label} className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <benefit.icon className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">
            {benefit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
