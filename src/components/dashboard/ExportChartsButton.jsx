import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ExportChartsButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Find all chart cards
      const chartCards = document.querySelectorAll('.chart-export-card');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      let yPosition = margin;

      // Add title
      pdf.setFontSize(16);
      pdf.text('Warranty Claims Report', margin, yPosition);
      yPosition += 10;
      
      // Add date
      pdf.setFontSize(10);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, yPosition);
      yPosition += 10;

      for (let i = 0; i < chartCards.length; i++) {
        const card = chartCards[i];
        
        // Capture the chart card as canvas
        const canvas = await html2canvas(card, {
          scale: 2,
          logging: false,
          useCORS: true
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add new page if needed (except for first chart)
        if (i > 0 && yPosition + imgHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }

        // Add chart to PDF
        pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
        yPosition += imgHeight + 10;

        // Add page break if we're running out of space
        if (yPosition > pageHeight - margin - 50 && i < chartCards.length - 1) {
          pdf.addPage();
          yPosition = margin;
        }
      }

      // Save the PDF
      pdf.save(`warranty-claims-report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error exporting charts:', error);
      alert('Failed to export charts. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className="text-white"
      style={{ backgroundColor: 'var(--hendy-blue)' }}
    >
      {isExporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Export Charts
        </>
      )}
    </Button>
  );
}