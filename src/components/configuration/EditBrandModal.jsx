import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditBrandModal({ brand, open, onOpenChange, onSave, isPending }) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name,
        manufacturer_deadline_days: brand.manufacturer_deadline_days || '',
        green_max_days: brand.green_max_days || '',
        green_min_days: brand.green_min_days || '',
        amber_max_days: brand.amber_max_days || '',
        amber_min_days: brand.amber_min_days || '',
        red_max_days: brand.red_max_days || '',
        red_min_days: brand.red_min_days || ''
      });
    }
  }, [brand]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Brand: {formData.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">Brand Name</Label>
              <Input
                placeholder="Brand name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Deadline Days</Label>
              <Input
                type="number"
                min="0"
                placeholder="Days until deadline"
                value={formData.manufacturer_deadline_days}
                onChange={(e) => handleChange('manufacturer_deadline_days', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label className="text-sm mb-3 block">Traffic Light Ranges (Days remaining)</Label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-xs text-black flex items-center gap-1 mb-2">
                  🟢 Green
                </Label>
                <div className="space-y-2">
                  <Input
                    type="number"
                    min="0"
                    placeholder="Max"
                    value={formData.green_max_days}
                    onChange={(e) => handleChange('green_max_days', e.target.value)}
                  />
                  <Input
                    type="number"
                    min="0"
                    placeholder="Min"
                    value={formData.green_min_days}
                    onChange={(e) => handleChange('green_min_days', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs text-black flex items-center gap-1 mb-2">
                  🟡 Amber
                </Label>
                <div className="space-y-2">
                  <Input
                    type="number"
                    min="0"
                    placeholder="Max"
                    value={formData.amber_max_days}
                    onChange={(e) => handleChange('amber_max_days', e.target.value)}
                  />
                  <Input
                    type="number"
                    min="0"
                    placeholder="Min"
                    value={formData.amber_min_days}
                    onChange={(e) => handleChange('amber_min_days', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs text-black flex items-center gap-1 mb-2">
                  🔴 Red
                </Label>
                <div className="space-y-2">
                  <Input
                    type="number"
                    min="0"
                    placeholder="Max"
                    value={formData.red_max_days}
                    onChange={(e) => handleChange('red_max_days', e.target.value)}
                  />
                  <Input
                    type="number"
                    min="0"
                    placeholder="Min"
                    value={formData.red_min_days}
                    onChange={(e) => handleChange('red_min_days', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700">
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}