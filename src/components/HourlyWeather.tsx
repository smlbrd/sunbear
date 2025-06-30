import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import getCoordsByCity from '../api/getCoordsByCity';
import getHourlyWeatherByCoords from '../api/getHourlyWeatherByCoords';
import { type HourlyWeatherData } from '../types/weather.types';

export default function HourlyWeather({
  city,
  setLoading,
}: {
  city: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const [hourly, setHourly] = useState<HourlyWeatherData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHourly = async () => {
      setLoading(true);
      setError(null);
      try {
        const coords = await getCoordsByCity(city);
        const data = await getHourlyWeatherByCoords(coords.lat, coords.lon);
        setHourly(data.slice(0, 12));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Could not fetch hourly weather.'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchHourly();
  }, [city, setLoading]);

  if (error)
    return (
      <div className="bg-red-50 p-4 rounded-md border border-red-200">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );

  if (!hourly.length) return null;

  const hours = hourly.map((h) =>
    new Date(h.time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  );
  const temps = hourly.map((h) => `${Math.round(h.temperature)}°C`);
  const feels = hourly.map((h) => `${Math.round(h.apparentTemperature)}°C`);
  const humidity = hourly.map((h) => `${h.humidity}%`);
  const precip = hourly.map((h) => `${h.precipitationProbability}%`);
  const uv = hourly.map((h) => h.uvIndex);

  return (
    <section
      aria-label="Hourly weather forecast"
      className="mt-4 overflow-x-auto"
    >
      <table className="min-w-max w-full text-center border-collapse bg-white rounded-lg shadow overflow-x-auto">
        <thead>
          <tr>
            <th className="p-2 text-xs font-semibold text-gray-600 bg-gray-100 sticky left-0 z-10">
              Metric
            </th>
            {hours.map((hour, i) => (
              <th
                key={i}
                className="p-2 text-xs font-semibold text-gray-600 bg-gray-100"
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
                {u}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  );
}
