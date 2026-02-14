import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PromoCardProps {
  title: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
}

export default function PromoCard({ title, subtitle, badge, imageUrl }: PromoCardProps) {
  return (
    <Card className="overflow-hidden rounded-2xl border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-0 relative aspect-[3/2]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <Badge className="mb-3 bg-white/90 text-foreground hover:bg-white">
            {badge}
          </Badge>
          <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">
            {title}
          </h3>
          <p className="text-sm text-white/90 drop-shadow">
            {subtitle}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
