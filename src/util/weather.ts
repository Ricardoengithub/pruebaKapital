export type DayPhase = 'morning' | 'day' | 'evening' | 'night';

export function getDayPhase(dt: number, sunrise: number, sunset: number): DayPhase {
  const oneHour = 60 * 60;

  if (dt >= sunrise && dt < sunrise + oneHour) return 'morning';
  if (dt >= sunrise + oneHour && dt < sunset - oneHour) return 'day';
  if (dt >= sunset - oneHour && dt < sunset + oneHour) return 'evening';
  return 'night';
}

export const gradients: Record<DayPhase, string> = {
  morning: 'linear-gradient(135deg, #4b6cb7, #182848)', // azul suave a oscuro
  day: 'linear-gradient(135deg, #2980b9, #2c3e50)',     // azul cielo apagado
  evening: 'linear-gradient(135deg, #614385, #516395)', // púrpura a azul grisáceo
  night: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', // noche profunda
};