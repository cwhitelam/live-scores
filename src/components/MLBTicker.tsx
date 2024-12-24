import React from 'react';
import { ComingSoonTicker } from './ComingSoonTicker';

interface MLBTickerProps {
  gameId?: string;
  className?: string;
}

export function MLBTicker({ gameId, className = '' }: MLBTickerProps) {
  return <ComingSoonTicker sport="MLB" className={className} />;
} 