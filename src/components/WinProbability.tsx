import React from 'react';
import { useWinProbability } from '../hooks/useWinProbability';

interface WinProbabilityProps {
  gameId: string;
  teamId?: string;
  className?: string;
}

export function WinProbability({ gameId, teamId, className = '' }: WinProbabilityProps) {
  const { probability, loading } = useWinProbability(gameId);

  console.log('[WinProbability] Rendering. loading:', loading, 'probability:', probability, 'teamId:', teamId);

  if (loading || !probability || !teamId) {
    return null;
  }

  const isHomeTeam = teamId === probability.homeTeamId;
  const percentage = isHomeTeam 
    ? probability.homeWinPercentage 
    : probability.awayWinPercentage;

  if (typeof percentage !== 'number' || isNaN(percentage)) {
    return null;
  }

  return (
    <div className={`${className} text-white/80`}>
      {Math.round(percentage)}% WIN
    </div>
  );
}