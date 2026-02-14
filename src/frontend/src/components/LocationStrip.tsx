import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import UpdateLocationDialog from './UpdateLocationDialog';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

export default function LocationStrip() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocalStorageState('user-location', 'your area');

  return (
    <>
      <div className="bg-accent/30 border-b">
        <div className="container-custom py-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <span className="text-foreground">
              Delivering to <span className="font-medium">{location}</span>
            </span>
            <span className="text-muted-foreground">•</span>
            <Button 
              variant="link" 
              size="sm" 
              className="h-auto p-0 text-sm font-medium text-primary"
              onClick={() => setIsOpen(true)}
            >
              Update location
            </Button>
          </div>
        </div>
      </div>
      <UpdateLocationDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
