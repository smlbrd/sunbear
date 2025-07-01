const temperatureClasses: [number, string][] = [
  [40, 'bg-red-600/60'],
  [35, 'bg-red-500/60'],
  [30, 'bg-red-400/60'],
  [25, 'bg-orange-500/50'],
  [23, 'bg-orange-400/50'],
  [20, 'bg-orange-500/40'],
  [15, 'bg-yellow-400/50'],
  [10, 'bg-yellow-400/40'],
  [5, 'bg-blue-300/50'],
  [0, 'bg-blue-200/40'],
];

export default function temperatureToColour(temp: number) {
  if (temp > 40) return 'bg-red-600/70';
  if (temp < 0) return 'bg-blue-200/30';

  for (const [threshold, colourClass] of temperatureClasses) {
    if (temp >= threshold) return colourClass;
  }
  return null;
}
