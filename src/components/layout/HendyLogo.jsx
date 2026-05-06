import React from 'react';

export default function HendyLogo({ size = 36, variant = 'full' }) {
  const logoUrl = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942a96650c5da106024b0dd/9d30dbdcc_logo2.png';
  
  if (variant === 'icon') {
    // Icon variant - just the car illustration part
    return (
      <div 
        className="rounded-lg overflow-hidden flex items-center justify-center" 
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          backgroundColor: '#222b57'
        }}
      >
        <img 
          src={logoUrl} 
          alt="Hendy" 
          className="w-full h-full object-contain p-1"
        />
      </div>
    );
  }

  // Full logo
  return (
    <img 
      src={logoUrl} 
      alt="Hendy Logo" 
      style={{ height: `${size}px` }}
      className="object-contain"
    />
  );
}