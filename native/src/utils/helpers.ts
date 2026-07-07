/**
 * Formatea un número para mostrarlo de forma abreviada.
 * Ejemplos:
 * - 1234 -> "1.2K"
 * - 1500000 -> "1.5M"
 * - 2000000000 -> "2B"
 * 
 * @param num - El número a formatear
 * @returns El número formateado como string
 */
export function getFormattedNumber(num: number): string {
  // Billones (1,000,000,000+)
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  // Millones (1,000,000+)
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  // Miles (1,000+)
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  // Menor a 1000, devuelve el número tal cual
  return num.toString();
}

/**
 * Genera un ID único simple basado en timestamp y random
 * Útil para crear keys únicas en listas
 */
export function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
