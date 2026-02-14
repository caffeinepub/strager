import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

interface UpdateLocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UpdateLocationDialog({ open, onOpenChange }: UpdateLocationDialogProps) {
  const [location, setLocation] = useLocalStorageState('user-location', 'your area');
  const [inputValue, setInputValue] = useState(location);

  const handleSave = () => {
    if (inputValue.trim()) {
      setLocation(inputValue.trim());
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update your location</DialogTitle>
          <DialogDescription>
            Enter your postal code or city to see delivery options for your area.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="location">Postal code or city</Label>
            <Input
              id="location"
              placeholder="e.g., 131021 or New Delhi"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
