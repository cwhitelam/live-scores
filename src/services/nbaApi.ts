import { Game } from '../types/game';
import { transformNBAGameData } from './transformers/nbaGameTransformer';
import { formatDate } from '../utils/dateUtils';
import { isNBAOffseason, getNextSeasonStartDate } from '../utils/nbaSeasonUtils';

const BASE_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba';

export async function getNBAScoreboard(): Promise<Game[]> {
  try {
    if (isNBAOffseason()) {
      return getNextSeasonGames();
    }

    const todayGames = await fetchGamesForDate(new Date());
    
    if (todayGames.length === 0) {
      const nextGameDay = await findNextGameDay();
      if (nextGameDay) {
        const games = await fetchGamesForDate(nextGameDay);
        return games.map(game => ({
          ...game,
          isUpcoming: true,
          gameDate: formatDate(nextGameDay)
        }));
      }
    }
    
    return todayGames;
  } catch (error) {
    console.error('NBA API Error:', error);
    throw new Error('Failed to fetch NBA data');
  }
}

async function getNextSeasonGames(): Promise<Game[]> {
  const seasonStartDate = getNextSeasonStartDate();
  const games = await fetchGamesForDate(seasonStartDate);
  
  return games.map(game => ({
    ...game,
    isUpcoming: true,
    gameDate: formatDate(seasonStartDate),
    isSeasonOpener: true
  }));
}

async function fetchGamesForDate(date: Date): Promise<Game[]> {
  const formattedDate = formatDate(date);
  const response = await fetch(`${BASE_URL}/scoreboard?dates=${formattedDate}`);
  
  if (!response.ok) {
    throw new Error(`NBA API HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (!data.events) {
    return [];
  }
  
  return Promise.all(data.events.map(transformNBAGameData));
}

async function findNextGameDay(): Promise<Date | null> {
  const today = new Date();
  let searchDate = new Date(today);
  
  // Look up to 7 days ahead
  for (let i = 1; i <= 7; i++) {
    searchDate.setDate(today.getDate() + i);
    const games = await fetchGamesForDate(searchDate);
    if (games.length > 0) {
      return searchDate;
    }
  }
  
  return null;
}