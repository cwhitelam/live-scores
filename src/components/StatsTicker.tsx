import React from 'react';
import { NFLTicker } from './NFLTicker';
import { NBATicker } from './NBATicker';
import { NHLTicker } from './NHLTicker';
import { MLBTicker } from './MLBTicker';

interface StatsTickerProps {
  gameId?: string;
  className?: string;
  sport?: string;
}

export function StatsTicker({ gameId, className = '', sport = 'NFL' }: StatsTickerProps) {
  switch (sport.toUpperCase()) {
    case 'NFL':
      return <NFLTicker gameId={gameId} className={className} />;
    case 'NBA':
      return <NBATicker gameId={gameId} className={className} />;
    case 'NHL':
      return <NHLTicker gameId={gameId} className={className} />;
    case 'MLB':
      return <MLBTicker gameId={gameId} className={className} />;
    default:
      return null;
  }
} 