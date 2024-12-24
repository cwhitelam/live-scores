import { WinProbability } from '../types/game';
import { SPORTS } from '../config/sports';
import { transformTeamData } from '../services/transformers/teamTransformer';

const BASE_URL = 'https://site.api.espn.com/apis/site/v2/sports';

export async function getGameWinProbability(gameId: string): Promise<WinProbability | null> {
  if (!gameId) return null;

  try {
    const sport = SPORTS.find(s => gameId.startsWith(s.name.toLowerCase()));
    if (!sport) return null;

    const url = `${BASE_URL}/${sport.apiPath}/summary?event=${gameId}`;
    const response = await fetch(url);
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    // Get team IDs and basic game info
    const competition = data.header?.competitions?.[0];
    if (!competition) return null;

    const homeTeamRaw = competition.competitors?.find((team: any) => team.homeAway === 'home');
    const awayTeamRaw = competition.competitors?.find((team: any) => team.homeAway === 'away');
    
    if (!homeTeamRaw?.id || !awayTeamRaw?.id) return null;

    // Transform both teams
    const homeTeam = transformTeamData(homeTeamRaw);
    const awayTeam = transformTeamData(awayTeamRaw);

    // Get win probability from predictor if available
    const predictor = data.predictor || {};
    const homeProb = predictor.homeTeam?.gameProjection;
    const awayProb = predictor.awayTeam?.gameProjection;

    // If we have valid probabilities from the API, use them
    if (typeof homeProb === 'number' && typeof awayProb === 'number') {
      return {
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        homeWinPercentage: homeProb,
        awayWinPercentage: awayProb,
        lastUpdated: new Date().toISOString()
      };
    }

    // Otherwise calculate based on score and game state
    return calculateBasicWinProbability(homeTeam, awayTeam, competition);
  } catch (error) {
    console.error('Win probability error:', error);
    return null;
  }
}

function calculateBasicWinProbability(homeTeam: any, awayTeam: any, competition: any): WinProbability {
  const homeScore = parseInt(homeTeam.score || '0');
  const awayScore = parseInt(awayTeam.score || '0');
  const period = parseInt(competition.status?.period || '0');
  const clock = competition.status?.displayClock;

  // Use the existing calculation logic from your current implementation
  const scoreDiff = homeScore - awayScore;
  const timeWeight = Math.min(period / 4, 1);
  const baseProb = 50 + (scoreDiff * 2 * timeWeight);
  const homeProb = Math.min(Math.max(baseProb, 10), 90);

  return {
    homeTeamId: homeTeam.id,
    awayTeamId: awayTeam.id,
    homeWinPercentage: homeProb,
    awayWinPercentage: 100 - homeProb,
    lastUpdated: new Date().toISOString()
  };
}