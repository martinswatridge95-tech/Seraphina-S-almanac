export function getCurrentMoonPhase(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  let c = 0;
  let jd = 0;
  let b = 0;

  // 1. Calculate Julian Date
  if (month < 3) {
    const yearAdjusted = year - 1;
    const monthAdjusted = month + 12;
    c = Math.floor(yearAdjusted / 100);
    jd = Math.floor(365.25 * yearAdjusted) + Math.floor(30.6001 * (monthAdjusted + 1)) + day + 1720994.5;
  } else {
    c = Math.floor(year / 100);
    jd = Math.floor(365.25 * year) + Math.floor(30.6001 * (month + 1)) + day + 1720994.5;
  }

  b = 2 - c + Math.floor(c / 4);
  jd = jd + b;

  // 2. Calculate days since known New Moon (Jan 6, 2000)
  const daysSinceNew = jd - 2451549.5;
  const newMoons = daysSinceNew / 29.530588853; // Using a more precise synodic month
  const phase = (newMoons - Math.floor(newMoons)) * 29.53;

  // 3. Return Phase Name based on centered windows
  if (phase < 1.84) return 'New Moon';
  if (phase < 5.53) return 'Waxing Crescent';
  if (phase < 9.22) return 'First Quarter';
  if (phase < 12.91) return 'Waxing Gibbous';
  if (phase < 16.61) return 'Full Moon';
  if (phase < 20.30) return 'Waning Gibbous';
  if (phase < 23.99) return 'Last Quarter';
  if (phase < 27.68) return 'Waning Crescent';
  return 'New Moon';
}

export function getMoonIcon(phase: string): string {
  const icons: Record<string, string> = {
    'New Moon': '🌑',
    'Waxing Crescent': '🌒',
    'First Quarter': '🌓',
    'Waxing Gibbous': '🌔',
    'Full Moon': '🌕',
    'Waning Gibbous': '🌖',
    'Last Quarter': '🌗',
    'Waning Crescent': '🌘'
  };
  return icons[phase] || '🌑';
}