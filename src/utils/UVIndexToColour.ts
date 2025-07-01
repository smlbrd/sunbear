const uvIndexClasses: [number, string][] = [
  [11, 'bg-purple-800/60'],
  [8, 'bg-red-700/50'],
  [6, 'bg-orange-500/60'],
  [3, 'bg-yellow-300/50'],
  [1, 'bg-green-200/40'],
  [0, 'bg-gray-50'],
];

export default function UVIndexToColour(uv: number): string {
  if (uv >= 11) return 'bg-purple-900/60';
  for (const [threshold, colourClass] of uvIndexClasses) {
    if (uv >= threshold) return colourClass;
  }
  return 'bg-gray-50';
}
