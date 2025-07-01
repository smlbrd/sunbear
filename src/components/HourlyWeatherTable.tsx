import type { HourlyWeatherData } from '../types/weather.types';
import { formatInTimeZone } from 'date-fns-tz';
import temperatureToColour from '../utils/temperatureToColour';

export default function HourlyWeatherTable({
  hourly,
  timezone,
}: {
  hourly: HourlyWeatherData[];
  timezone: string;
}) {
  const hours = hourly.map((h) => formatInTimeZone(h.time, timezone, 'HHmm'));
  const humidity = hourly.map((h) => `${h.humidity}%`);
  const precip = hourly.map((h) => `${h.precipitationProbability}%`);
  const uv = hourly.map((h) => h.uvIndex);

  return (
    <table className="min-w-max w-full text-center border-collapse bg-white rounded-lg shadow overflow-x-auto">
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
          <td className="p-2 text-md md:text-lg text-gray-700 bg-gray-50 sticky left-0">
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
          <td className="p-2 text-md md:text-lg text-gray-700 bg-gray-50 sticky left-0">
            UV Index
          </td>
          {uv.map((u, i) => (
            <td key={i} className="p-2">
              {Math.round(u)}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
