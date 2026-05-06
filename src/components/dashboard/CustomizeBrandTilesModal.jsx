import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CustomizeBrandTilesModal({ open, onOpenChange, brands, selectedBrands, onSave }) {
  const [localSelected, setLocalSelected] = useState(selectedBrands);

  const handleSelectAll = () => {
    setLocalSelected(brands.map(b => b.id));
  };

  const handleDeselectAll = () => {
    setLocalSelected([]);
  };

  const handleToggle = (brandId) => {
    setLocalSelected(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleSave = () => {
    onSave(localSelected);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Customise Brand Tiles</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              className="text-xs"
            >
              Select All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeselectAll}
              className="text-xs"
            >
              Deselect All
            </Button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {brands.map(brand => (
              <div key={brand.id} className="flex items-center gap-3">
                <Checkbox
                  id={`brand-${brand.id}`}
                  checked={localSelected.includes(brand.id)}
                  onCheckedChange={() => handleToggle(brand.id)}
                />
                <Label htmlFor={`brand-${brand.id}`} className="cursor-pointer text-sm font-medium">
                  {brand.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            style={{ backgroundColor: 'var(--hendy-blue)' }}
            className="text-white"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}