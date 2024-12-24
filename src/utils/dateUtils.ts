export function isPlayoffWeek(): boolean {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based (0 = January)
  
  return (month === 0); // January = playoffs
}

export function parseGameTime(timeString: string): Date {
  const today = new Date();
  const [time, period] = timeString.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  
  let hour24 = hours;
  if (period === 'PM' && hours !== 12) hour24 += 12;
  if (period === 'AM' && hours === 12) hour24 = 0;
  
  const gameDate = new Date(today);
  gameDate.setHours(hour24, minutes, 0, 0);
  
  if (gameDate < today) {
    gameDate.setDate(gameDate.getDate() + 1);
  }
  
  return gameDate;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0].replace(/-/g, '');
}

export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}