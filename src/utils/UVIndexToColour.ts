const uvIndexClasses: [number, string][] = [
  [11, 'bg-purple-700/60'],
  [8, 'bg-red-600/50'],
  [6, 'bg-orange-500/60'],
  [3, 'bg-yellow-300/60'],
  [1, 'bg-green-300/60'],
  [0, 'bg-gray-200'],
];

export default function UVIndexToColour(uv: number): string {
  if (uv >= 11) return 'bg-purple-900/60';
  for (const [threshold, colourClass] of uvIndexClasses) {
    if (uv >= threshold) return colourClass;
  }
  return 'bg-gray-50';
}
