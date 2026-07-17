import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';

export default function ExportButton({ claims, filters }) {

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: () => databaseClients.Brand.get()
  });

  const handleExport = () => {
    // Prepare CSV data
    const headers = [
      'WIP Number',
      'Site',
      'Brand',
      'Expected Hours',
      'Last Clocking Date',
      'Scanned Date',
      'Status',
      'Claimed',
      'Claimed Date',
      'Alert',
      'Alert Resolution',
      'Submitted By',
      'Submitted Date'
    ];

    const rows = claims.map(claim => [
      claim.wip_number,
      claim.site,
      brands.find(b => b.id === claim.brand).name,
      claim.expected_hours,
      claim.last_clocking_date ? format(new Date(claim.last_clocking_date), 'yyyy-MM-dd') : '',
      claim.scanned_date ? format(new Date(claim.scanned_date), 'yyyy-MM-dd') : '',
      claim.status,
      claim.claimed ? 'Yes' : 'No',
      claim.claimed_date ? format(new Date(claim.claimed_date), 'yyyy-MM-dd') : '',
      claim.alert || '',
      claim.alert_resolution || '',
      claim.created_by,
      format(new Date(claim.created_date), 'yyyy-MM-dd HH:mm')
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `hendy-warranty-claims-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button 
      onClick={handleExport}
      className="gap-2"
      style={{ backgroundColor: 'var(--hendy-blue)' }}
    >
      <Download className="h-4 w-4" />
      Export to CSV
    </Button>
  );
}