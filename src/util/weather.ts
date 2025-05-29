type DayPhase = 'morning' | 'day' | 'evening' | 'night';

export function getDayPhase(dt: number, sunrise: number, sunset: number): DayPhase {
  const oneHour = 60 * 60; // en segundos

  if (dt >= sunrise && dt < sunrise + oneHour) return 'morning';
  if (dt >= sunrise + oneHour && dt < sunset - oneHour) return 'day';
  if (dt >= sunset - oneHour && dt < sunset + oneHour) return 'evening';
  return 'night';
}

export const gradients: Record<DayPhase, string> = {
  morning: 'linear-gradient(135deg, #FFDEE9, #B5FFFC, #FEE140, #FA709A)', // suave, rosado y dorado
  day: 'linear-gradient(135deg, #56CCF2, #2F80ED, #00c6ff, #0072ff)', // azul brillante, cielo despejado
  evening: 'linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee)', // rosa-lavanda suave
  night: 'linear-gradient(135deg, #141E30, #243B55, #1D2671, #C33764)', // azul oscuro a púrpura profundo
};
