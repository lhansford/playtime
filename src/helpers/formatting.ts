export function pluraliseMinutes(number: number): string {
  return number === 1 ? '1 minute' : `${number} minutes`;
}
