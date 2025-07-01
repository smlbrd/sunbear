const temperatureClasses: [number, string][] = [
  [40, 'bg-red-700/60'],
  [35, 'bg-red-600/50'],
  [30, 'bg-orange-500/60'],
  [25, 'bg-orange-400/50'],
  [20, 'bg-yellow-300/50'],
  [15, 'bg-green-200/40'],
  [10, 'bg-blue-200/40'],
  [5, 'bg-blue-300/50'],
  [0, 'bg-blue-400/50'],
];

export default function temperatureToColour(temp: number): string {
  if (temp > 40) return 'bg-red-700/70';
  if (temp < 0) return 'bg-blue-800/40';

  for (const [threshold, colourClass] of temperatureClasses) {
    if (temp >= threshold) return colourClass;
  }
  return 'bg-gray-50';
}
