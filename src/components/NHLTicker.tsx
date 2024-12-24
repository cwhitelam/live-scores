import React from 'react';
import { ComingSoonTicker } from './ComingSoonTicker';

interface NHLTickerProps {
  gameId?: string;
  className?: string;
}

export function NHLTicker({ gameId, className = '' }: NHLTickerProps) {
  return <ComingSoonTicker sport="NHL" className={className} />;
} 