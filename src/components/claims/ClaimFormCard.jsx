import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Send, CheckCircle2, AlertTriangle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';
import { currentUser as currentUserClient } from '@/api/currentUser';

export default function ClaimFormCard({ onSubmit, isSubmitting }) {
  const { data: sites = [] } = useQuery({
    queryKey: ['sites'],
    queryFn: async () => {
      const sitesData = await databaseClients.Site.get();
      return sitesData.sort((a, b) => a.name.localeCompare(b.name));
    }
  });
  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const brandData = await databaseClients.Brand.get();
      return brandData.sort((a, b) => a.name.localeCompare(b.name));
    }
  });
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => currentUserClient.me()
  });
  const [formData, setFormData] = useState({
    wip_number: '',
    expected_hours: '',
    last_clocking_date: null,
    scanned_date: new Date(),
    site: currentUser?.default_site || '',
    brand: '',
    manufacturer_deadline: null,
    is_campaign: false,
    campaign_reference: ''
  });

  // Auto-populate site when currentUser loads
  React.useEffect(() => {
    if (currentUser?.default_site && !formData.site) {
      setFormData(prev => ({ ...prev, site: currentUser.default_site }));
    }
  }, [currentUser?.default_site]);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.brand || !formData.last_clocking_date) {
      return;
    }
    
    const submitData = {
      ...formData,
      expected_hours: parseFloat(formData.expected_hours),
      last_clocking_date: formData.last_clocking_date ? format(formData.last_clocking_date, 'yyyy-MM-dd') : null,
      scanned_date: formData.scanned_date ? format(formData.scanned_date, "yyyy-MM-dd'T'HH:mm:ss") : null,
      manufacturer_deadline: formData.manufacturer_deadline ? format(formData.manufacturer_deadline, 'yyyy-MM-dd') : null,
      status: 'in_progress'
    };

    try {
      await onSubmit(submitData);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to submit claim",
        description: error?.message || "Please try again.",
      });
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        wip_number: '',
        expected_hours: '',
        last_clocking_date: null,
        scanned_date: new Date(),
        site: '',
        brand: '',
        manufacturer_deadline: null,
        is_campaign: false,
        campaign_reference: ''
      });
    }, 2000);
  };

  const handleLastClockingSelect = (date) => {
    const selectedBrand = brands.find(b => b.id === formData.brand);
    const deadlineDays = selectedBrand?.manufacturer_deadline_days;
    let deadline = formData.manufacturer_deadline;
    if (deadlineDays && date) {
      deadline = new Date(date);
      deadline.setDate(deadline.getDate() + deadlineDays);
    }
    setFormData(prev => ({ ...prev, last_clocking_date: date, manufacturer_deadline: deadline }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold text-slate-800">
            Submit Warranty Repair
          </CardTitle>
          <CardDescription className="text-slate-500">
            Enter the details for the new warranty repair
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <p className="text-lg font-medium text-slate-800">Claim Submitted Successfully</p>
                <p className="text-sm text-slate-500 mt-1">Preparing new form...</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="wip_number" className="text-sm font-medium text-slate-700">
                    WIP Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="wip_number"
                    placeholder="Enter WIP number"
                    value={formData.wip_number}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, ''); //Remove non-numeric characters
                      setFormData({ ...formData, wip_number: val });
                    }}
                    required
                    inputMode="numeric"
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expected_hours" className="text-sm font-medium text-slate-700">
                    Expected Resource (Hours) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="expected_hours"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Enter expected hours"
                    value={formData.expected_hours}
                    onChange={(e) => setFormData({ ...formData, expected_hours: e.target.value })}
                    required
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site" className="text-sm font-medium text-slate-700">
                    Site <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.site} 
                    onValueChange={(value) => setFormData({ ...formData, site: value, brand: '', manufacturer_deadline: null })}
                    required
                  >
                    <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select site location" />
                    </SelectTrigger>
                    <SelectContent>
                      {sites.map((site) => (
                        <SelectItem key={site.id} value={site.id}>
                          {site.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand" className="text-sm font-medium text-slate-700">
                    Brand <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.brand} 
                    onValueChange={(value) => {
                      const selectedBrand = brands.find(b => b.id === value);
                      const deadlineDays = selectedBrand?.manufacturer_deadline_days;
                      const deadline = deadlineDays && formData.last_clocking_date ? (() => {
                        const date = new Date(formData.last_clocking_date);
                        date.setDate(date.getDate() + deadlineDays);
                        return date;
                      })() : null;
                      setFormData({ ...formData, brand: value, manufacturer_deadline: deadline });
                    }}
                    required
                  >
                    <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder={formData.site ? "Select brand" : "Select a site first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {(() => {
                        const selectedSite = sites.find(s => s.id === formData.site);
                        const siteBrands = selectedSite?.brands?.length > 0
                          ? brands.filter(b => selectedSite.brands.includes(b.id))
                          : brands;
                        return siteBrands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </SelectItem>
                        ));
                      })()}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Clocking Date <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal border-slate-200 hover:bg-slate-50",
                            !formData.last_clocking_date && "text-slate-400"
                          )}
                        >
                          <CalendarIcon className="mr-3 h-4 w-4 text-slate-400" />
                          {formData.last_clocking_date ? (
                            format(formData.last_clocking_date, "PPP")
                          ) : (
                            "Select date"
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.last_clocking_date}
                          disabled={(date) => date > formData.scanned_date}
                          onSelect={handleLastClockingSelect}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Scanned Date
                    </Label>
                    <div className="w-full h-12 rounded-md border border-slate-200 bg-slate-50 px-4 flex items-center text-slate-600">
                      <CalendarIcon className="mr-3 h-4 w-4 text-slate-400" />
                      {format(formData.scanned_date, "PPP 'at' HH:mm")}
                    </div>
                  </div>
                </div>

                {formData.manufacturer_deadline && (() => {
                  const selectedBrand = brands.find(b => b.id === formData.brand);
                  const daysRemaining = Math.ceil((new Date(formData.manufacturer_deadline) - new Date()) / (1000 * 60 * 60 * 24));
                  
                  let bgColor = 'bg-slate-100';
                  let textColor = 'text-slate-700';

                  if (selectedBrand) {
                    if (daysRemaining < 1) {
                      bgColor = 'bg-red-100';
                      textColor = 'text-red-700';
                    } else if (selectedBrand.green_max_days != null && daysRemaining > selectedBrand.green_max_days) {
                      bgColor = 'bg-green-100';
                      textColor = 'text-green-700';
                    } else {
                      const inGreenRange = selectedBrand.green_min_days != null && selectedBrand.green_max_days != null && 
                        daysRemaining >= selectedBrand.green_min_days && daysRemaining <= selectedBrand.green_max_days;
                      const inAmberRange = selectedBrand.amber_min_days != null && selectedBrand.amber_max_days != null && 
                        daysRemaining >= selectedBrand.amber_min_days && daysRemaining <= selectedBrand.amber_max_days;
                      const inRedRange = selectedBrand.red_min_days != null && selectedBrand.red_max_days != null && 
                        daysRemaining >= selectedBrand.red_min_days && daysRemaining <= selectedBrand.red_max_days;

                      if (inGreenRange) {
                        bgColor = 'bg-green-100';
                        textColor = 'text-green-700';
                      } else if (inAmberRange) {
                        bgColor = 'bg-amber-100';
                        textColor = 'text-amber-700';
                      } else if (inRedRange) {
                        bgColor = 'bg-red-100';
                        textColor = 'text-red-700';
                      }
                    }
                  }
                  
                  return (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Mfr Deadline
                      </Label>
                      <div className={cn("w-full h-12 rounded-md border px-4 flex items-center justify-between", bgColor, textColor)}>
                        <span className="font-medium">{format(formData.manufacturer_deadline, "PPP")}</span>
                        <span className="text-xs">{daysRemaining} days</span>
                      </div>
                    </div>
                  );
                })()}

                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="campaign-toggle"
                      checked={!!formData.is_campaign}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_campaign: !!checked, campaign_reference: checked ? prev.campaign_reference: '' }))}
                    />
                    <label htmlFor="campaign-toggle" className="text-sm font-medium text-slate-700 cursor-pointer select-none flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4" style={{ color: 'var(--hendy-blue)'}} />
                      Safety Recall / Service Campaign
                    </label>
                  </div>
                  {formData.is_campaign && (
                    <Input
                      placeholder="Enter campaign reference number or description"
                      value={formData.campaign_reference}
                      onChange={(e) => setFormData(prev => ({ ...prev, campaign_reference: e.target.value }))}
                      className="h-10 border-slate-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-white font-medium shadow-lg transition-all duration-300"
                  style={{ 
                    backgroundColor: 'var(--hendy-blue)',
                    boxShadow: '0 10px 15px -3px rgba(34, 43, 87, 0.25)'
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Submit Claim
                    </span>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}