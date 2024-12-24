import { NHLSituation } from './nhl';

export interface TeamInfo {
  id: string;
  name: string;
  abbreviation: string;
  score: number;
  record: string;
  winProbability?: number;
}

export interface VenueInfo {
  name: string;
  city: string;
  state: string;
}

export interface GameWeather {
  temp: number;
  condition: string;
}

export interface GamePlaySituation {
  down?: number;
  distance?: number;
  yardLine?: number;
  possession?: string;
  // NHL specific
  powerPlay?: boolean;
  strength?: string;
  lastPlay?: string;
}

export interface Team {
  name: string;
  abbreviation: string;
  logo: string;
  score: number;
  record: string;
}

export interface Game {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  venue: string;
  weather?: string;
  quarter: string;
  timeLeft: string;
  startTime: string;
  situation?: string;
}

export interface WinProbability {
  homeTeamId: string;
  awayTeamId: string;
  homeWinPercentage: number;
  awayWinPercentage: number;
  lastUpdated: string;
}

export interface TimeSlot {
  time: string;
  games: Game[];
}

export interface TimeSlate {
  name: string;
  games: Game[];
}