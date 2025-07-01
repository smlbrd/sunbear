import { useEffect, useRef } from 'react';
import UVIndexToColour from '../utils/UVIndexToColour';

const uvLevels = [
  {
    range: '0',
    label: 'No risk',
    advice: "It's safe to stay outside.",
    uv: 0,
  },
  {
    range: '1-2',
    label: 'Low',
    advice:
      'You can safely stay outside. Consider sunscreen in direct sunlight.',
    uv: 1,
  },
  {
    range: '3-5',
    label: 'Moderate',
    advice:
      'Take care during midday hours and do not spend too much time in the sun unprotected. Sunscreen advised.',
    uv: 3,
  },
  {
    range: '6-7',
    label: 'High',
    advice: 'Seek shade during midday hours, cover up and wear sunscreen.',
    uv: 6,
  },
  {
    range: '8-10',
    label: 'Very high',
    advice:
      'Spend time in the shade between 11am and 3pm. Shirt, sunscreen and hat are essential.',
    uv: 8,
  },
  {
    range: '11',
    label: 'Extreme',
    advice:
      'Avoid being outside during midday hours. Shirt, sunscreen and hat essential.',
    uv: 11,
  },
];

export default function UVInfoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      closeBtnRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[60vw] h-[80vh] max-w-2xl max-h-[90vh] relative flex flex-col"
        style={{ minWidth: 320 }}
      >
        <button
          ref={closeBtnRef}
          className="absolute top-2 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close UV Index info"
        >
          X
        </button>
        <h3 className="text-lg font-semibold mb-2">UV Index</h3>
        <p className="text-md text-gray-700 mb-4">
          The UV Index is a measure of the strength of sunburn-producing
          ultraviolet radiation at a particular place and time.
        </p>
        <div className="mb-2 text-sm font-semibold text-gray-700">
          UV exposure index and the protection required to help keep you safe:
        </div>
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="w-20 px-2 py-1">Index</th>
                <th className="w-24 px-2 py-1">Level</th>
                <th className="px-2 py-1">Advice</th>
              </tr>
            </thead>
            <tbody>
              {uvLevels.map((level) => (
                <tr key={level.range} className="align-top">
                  <td className="px-2 py-1">
                    <span
                      className={`font-bold inline-block text-center rounded ${UVIndexToColour(
                        level.uv
                      )} px-3 py-1 w-16 h-8 flex items-center justify-center`}
                    >
                      {level.range}
                    </span>
                  </td>
                  <td className="px-2 py-1 font-semibold">{level.label}</td>
                  <td className="px-2 py-1 text-sm text-gray-800">
                    {level.advice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
