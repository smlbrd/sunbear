const temperatureClasses: [number, string][] = [
  [40, 'bg-red-700/60'],
  [35, 'bg-red-600/50'],
  [30, 'bg-orange-600/50'],
  [25, 'bg-orange-500/50'],
  [20, 'bg-orange-400/50'],
  [15, 'bg-yellow-500/50'],
  [10, 'bg-yellow-400/50'],
  [5, 'bg-yellow-300/40'],
  [0, 'bg-blue-400/30'],
];

export default function temperatureToColour(temp: number): string {
  if (temp > 45) return 'bg-red-700/60';
  if (temp < 0) return 'bg-blue-500/30';

  for (const [threshold, colourClass] of temperatureClasses) {
    if (temp >= threshold) return colourClass;
  }
  return 'bg-gray-50';
}
