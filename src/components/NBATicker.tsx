import React from 'react';
import { ComingSoonTicker } from './ComingSoonTicker';

interface NBATickerProps {
  gameId?: string;
  className?: string;
}

export function NBATicker({ gameId, className = '' }: NBATickerProps) {
  return <ComingSoonTicker sport="NBA" className={className} />;
} 