import { formatDate } from './dateUtils';

export function isNBAOffseason(): boolean {
  const now = new Date();
  const month = now.getMonth(); // 0-based (0 = January)
  
  // NBA season typically runs from October through June
  return month >= 6 && month <= 8; // July through September is offseason
}

export function getNextSeasonStartDate(): Date {
  const now = new Date();
  const year = now.getFullYear();
  
  // NBA season typically starts in mid-October
  // Using October 15th as an approximate date
  const seasonStart = new Date(year, 9, 15); // Month is 0-based, so 9 = October
  
  // If we're past October, use next year
  if (now > seasonStart) {
    seasonStart.setFullYear(year + 1);
  }
  
  return seasonStart;
}

export function shouldResetNBAScores(): boolean {
  const now = new Date();
  const storedDate = localStorage.getItem('nbaLastResetDate');
  
  if (!storedDate) {
    localStorage.setItem('nbaLastResetDate', formatDate(now));
    return true;
  }

  // Reset if it's a new day
  const currentDate = formatDate(now);
  if (currentDate !== storedDate) {
    localStorage.setItem('nbaLastResetDate', currentDate);
    return true;
  }

  return false;
}