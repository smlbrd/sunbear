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
      <table className="min-w-max w-full text-center border-collapse bg-white rounded-lg overflow-x-auto">
        <thead>
          <tr>
            <th className="bg-gray-100 sticky left-0 z-10" scope="col">
              <span className="sr-only">Metric</span>
            </th>
            {hours.map((hour, i) => (
              <th
                key={i}
                className="p-2 text-sm font-semibold text-gray-600 bg-gray-100"
                scope="col"
              >
                {hour}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 text-md md:text-lg text-gray-700 bg-gray-100 sticky left-0">
              Temp
            </td>
            {hourly.map((h, i) => (
              <td
                key={i}
                className={`p-2 ${temperatureToColour(
                  Math.round(h.temperature)
                )}`}
              >
                {Math.round(h.temperature)}°C
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-2 text-md md:text-lg text-gray-700 bg-gray-50 sticky left-0">
              Feels Like
            </td>
            {hourly.map((h, i) => (
              <td
                key={i}
                className={`p-2 ${temperatureToColour(
                  Math.round(h.apparentTemperature)
                )}`}
              >
                {Math.round(h.apparentTemperature)}°C
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-2 text-md md:text-lg text-gray-700 bg-gray-50 sticky left-0">
              Humidity
            </td>
            {humidity.map((h, i) => (
              <td key={i} className="p-2">
                {h}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-2 text-md md:text-lg text-gray-700 bg-gray-50 sticky left-0">
              Precip %
            </td>
            {precip.map((p, i) => (
              <td key={i} className="p-2">
                {p}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-2 text-md md:text-lg text-gray-700 bg-gray-50 sticky left-0 flex justify-center gap-1">
              UV Index
              <button
                type="button"
                ref={uvInfoButtonRef}
                className="ml-1 w-5 h-5 flex items-center justify-center rounded-full bg-gray-500 text-white text-xs font-bold border border-gray-600 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700"
                aria-label="More info about UV Index"
                onClick={() => setUvInfoOpen(true)}
                tabIndex={0}
              >
                i
              </button>
            </td>
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
