import React from 'react';
import { Game, TeamInfo } from '../types/game';
import { TeamDisplay } from './TeamDisplay';
import { GameHeader } from './GameHeader';
import { GameFooter } from './GameFooter';
import { nbaTeamColors, nflTeamColors, mlbTeamColors, nhlTeamColors } from '../data/colors';
import { useSport } from '../context/SportContext';
import { GameContextProvider } from '../context/GameContext';
import { StatsTicker } from './StatsTicker';

const DEFAULT_COLORS = {
  primary: 'rgb(31, 41, 55)',
  secondary: 'rgb(209, 213, 219)'
};

interface Situation {
  down: number;
  distance: number;
  yardLine: number;
  possession: string;
  [key: string]: any;
}

interface Weather {
  temp: number;
  condition: string;
  [key: string]: any;
}

interface Venue {
  name: string;
  city: string;
  state: string;
}

export function ScoreCard({
  id,
  homeTeam,
  awayTeam,
  venue,
  weather,
  quarter,
  timeLeft,
  startTime,
  situation
}: Game) {
  const { currentSport } = useSport();
  
  const getTeamColors = () => {
    switch (currentSport) {
      case 'NBA':
        return nbaTeamColors;
      case 'NFL':
        return nflTeamColors;
      case 'MLB':
        return mlbTeamColors;
      case 'NHL':
        return nhlTeamColors;
      default:
        return {};
    }
  };

  const convertToTeamInfo = (team: any): TeamInfo => ({
    id: team.id || team.abbreviation,
    name: team.name,
    abbreviation: team.abbreviation,
    score: team.score,
    record: team.record,
    winProbability: team.winProbability
  });

  const homeTeamInfo = convertToTeamInfo(homeTeam);
  const awayTeamInfo = convertToTeamInfo(awayTeam);

  const teamColors = getTeamColors();
  const awayColors = teamColors[awayTeam.abbreviation] || DEFAULT_COLORS;
  const homeColors = teamColors[homeTeam.abbreviation] || DEFAULT_COLORS;

  const defaultSituation: Situation = {
    down: 0,
    distance: 0,
    yardLine: 0,
    possession: ''
  };

  const defaultWeather: Weather = {
    temp: 0,
    condition: ''
  };

  const defaultVenue: Venue = {
    name: typeof venue === 'string' ? venue : venue?.name || '',
    city: typeof venue === 'string' ? '' : venue?.city || '',
    state: typeof venue === 'string' ? '' : venue?.state || ''
  };

  return (
    <GameContextProvider
      quarter={quarter}
      timeLeft={timeLeft}
      homeTeam={homeTeamInfo}
      awayTeam={awayTeamInfo}
    >
      <div className="rounded-xl overflow-hidden shadow-lg bg-gray-800/50 backdrop-blur-sm border border-white/10">
        <GameHeader 
          quarter={quarter}
          timeLeft={timeLeft}
          startTime={startTime}
          situation={situation ? { ...defaultSituation, ...situation } : undefined}
          awayTeam={awayTeam.abbreviation}
          homeTeam={homeTeam.abbreviation}
        />
        <div className="flex-col">
          <div className="flex">
            <div 
              className="flex-1 border-r border-gray-900/50"
              style={{ 
                backgroundColor: awayColors.primary,
                position: 'relative'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
              <TeamDisplay team={awayTeamInfo} gameId={id} />
            </div>
            <div 
              className="flex-1"
              style={{ 
                backgroundColor: homeColors.primary,
                position: 'relative'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
              <TeamDisplay team={homeTeamInfo} gameId={id} />
            </div>
          </div>
          <StatsTicker gameId={id} className="w-full" sport={currentSport} />
        </div>
        <GameFooter 
          venue={defaultVenue}
          weather={weather ? { ...defaultWeather, ...weather } : undefined}
        />
      </div>
    </GameContextProvider>
  );
}