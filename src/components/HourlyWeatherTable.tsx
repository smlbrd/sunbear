import { useRef, useState } from 'react';
import type { HourlyWeatherData } from '../types/weather.types';
import { formatInTimeZone } from 'date-fns-tz';
import temperatureToColour from '../utils/temperatureToColour';
import UVIndexToColour from '../utils/UVIndexToColour';
import UVInfoModal from './UVInfoModal';

export default function HourlyWeatherTable({
  hourly,
  timezone,
}: {
  hourly: HourlyWeatherData[];
  timezone: string;
}) {
  const [uvInfoOpen, setUvInfoOpen] = useState(false);
  const uvInfoButtonRef = useRef<HTMLButtonElement>(null);
  const hours = hourly.map((h) => formatInTimeZone(h.time, timezone, 'HHmm'));
  const humidity = hourly.map((h) => `${h.humidity}%`);
  const precip = hourly.map((h) => `${h.precipitationProbability}%`);
  const uv = hourly.map((h) => h.uvIndex);

  return (
    <>
      <UVInfoModal
        open={uvInfoOpen}
        onClose={() => {
          setUvInfoOpen(false);
          uvInfoButtonRef.current?.focus();
        }}
      />
      <table className="min-w-max w-full text-center border-collapse bg-gray-100 rounded-lg overflow-x-auto">
        <thead>
          <tr className="divide-x divide-gray-200">
            {hours.map((hour, i) => (
              <th
                key={i}
                className="p-2 hw-col text-sm font-semibold text-gray-700 bg-gray-100"
                scope="col"
              >
                {hour}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colSpan={hourly.length}
              className="text-left text-sm py-1 text-gray-700"
            >
              Temp (°C)
            </td>
          </tr>
          <tr className="divide-x divide-gray-200">
            {hourly.map((h, i) => (
              <td
                key={i}
                className={`p-2 hw-col ${temperatureToColour(
                  Math.round(h.temperature)
                )}`}
              >
                {Math.round(h.temperature)}
              </td>
            ))}
          </tr>
          <tr>
            <td
              colSpan={hourly.length}
              className="text-left text-sm py-1 text-gray-700"
            >
              Feels Like (°C)
            </td>
          </tr>
          <tr className="divide-x divide-gray-200">
            {hourly.map((h, i) => (
              <td
                key={i}
                className={`p-2 hw-col ${temperatureToColour(
                  Math.round(h.apparentTemperature)
                )}`}
              >
                {Math.round(h.apparentTemperature)}
              </td>
            ))}
          </tr>
          <tr>
            <td
              colSpan={hourly.length}
              className="text-left text-sm py-1 text-gray-700"
            >
              Humidity
            </td>
          </tr>
          <tr className="divide-x divide-gray-200">
            {humidity.map((h, i) => (
              <td key={i} className="p-2">
                {h}
              </td>
            ))}
          </tr>
          <tr>
            <td
              colSpan={hourly.length}
              className="text-left text-sm py-1 text-gray-700"
            >
              Precip %
            </td>
          </tr>
          <tr className="divide-x divide-gray-200">
            {precip.map((p, i) => (
              <td key={i} className="p-2">
                {p}
              </td>
            ))}
          </tr>
          <tr>
            <td
              colSpan={hourly.length}
              className="text-left text-sm py-1 text-gray-700"
            >
              <div className="inline-flex items-center gap-2">
                UV Index
                <button
                  type="button"
                  ref={uvInfoButtonRef}
                  className="ml-1 w-5 h-5 flex items-center justify-center rounded-full bg-gray-500 text-white text-xs font-bold border border-gray-600 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700"
                  aria-label="More info about UV Index"
                  onClick={() => setUvInfoOpen(true)}
                >
                  i
                </button>
              </div>
            </td>
          </tr>
          <tr className="divide-x divide-gray-200">
            {uv.map((u, i) => (
              <td key={i} className={`p-2 ${UVIndexToColour(Math.round(u))}`}>
                {Math.round(u)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}
