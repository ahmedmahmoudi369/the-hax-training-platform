'use client';

import { useEffect, useState } from 'react';

interface LocalizedDateProps {
  isoString: string;
  className?: string;
}

export function LocalizedDate({ isoString, className = '' }: LocalizedDateProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // Format the date only on the client side
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    setFormattedDate(date.toLocaleString('en-US', options));
  }, [isoString]);

  return (
    <p className={`text-xs text-muted-foreground ${className}`}>
      {formattedDate || 'Loading...'}
    </p>
  );
}
