import type { HourlyWeatherData } from '../types/weather.types';
import { formatInTimeZone } from 'date-fns-tz';

export default function HourlyWeatherTable({
  hourly,
  timezone,
}: {
  hourly: HourlyWeatherData[];
  timezone: string;
}) {
  const now = new Date();
  const nowLocal = formatInTimeZone(now, timezone, "yyyy-MM-dd'T'HH:00");

  const startIndex = hourly.findIndex((h) => {
    const nextLocal = formatInTimeZone(h.time, timezone, "yyyy-MM-dd'T'HH:00");
    return nextLocal >= nowLocal;
  });

  const displayHours = hourly.slice(
    startIndex >= 0 ? startIndex : 0,
    (startIndex >= 0 ? startIndex : 0) + 12
  );

  const hours = displayHours.map((h) =>
    formatInTimeZone(h.time, timezone, 'HHmm')
  );
  const temps = hourly.map((h) => `${Math.round(h.temperature)}°C`);
  const feels = hourly.map((h) => `${Math.round(h.apparentTemperature)}°C`);
  const humidity = hourly.map((h) => `${h.humidity}%`);
  const precip = hourly.map((h) => `${h.precipitationProbability}%`);
  const uv = hourly.map((h) => h.uvIndex);

  return (
    <table className="min-w-max w-full text-center border-collapse bg-white rounded-lg shadow overflow-x-auto">
      <thead>
        <tr>
          <th
            className="p-2 text-xs font-semibold text-gray-600 bg-gray-100 sticky left-0 z-10"
            scope="col"
          >
            Metric
          </th>
          {hours.map((hour, i) => (
            <th
              key={i}
              className="p-2 text-xs font-semibold text-gray-600 bg-gray-100"
              scope="col"
            >
              {hour}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 font-medium text-gray-700 bg-gray-50 sticky left-0">
            Temp
          </td>
          {temps.map((t, i) => (
            <td key={i} className="p-2">
              {t}
            </td>
          ))}
        </tr>
        <tr>
          <td className="p-2 font-medium text-gray-700 bg-gray-50 sticky left-0">
            Feels Like
          </td>
          {feels.map((f, i) => (
            <td key={i} className="p-2">
              {f}
            </td>
          ))}
        </tr>
        <tr>
          <td className="p-2 font-medium text-gray-700 bg-gray-50 sticky left-0">
            Humidity
          </td>
          {humidity.map((h, i) => (
            <td key={i} className="p-2">
              {h}
            </td>
          ))}
        </tr>
        <tr>
          <td className="p-2 font-medium text-gray-700 bg-gray-50 sticky left-0">
            Precip %
          </td>
          {precip.map((p, i) => (
            <td key={i} className="p-2">
              {p}
            </td>
          ))}
        </tr>
        <tr>
          <td className="p-2 font-medium text-gray-700 bg-gray-50 sticky left-0">
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
