import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import getCoordsByCity from '../api/getCoordsByCity';
import getHourlyWeatherByCoords from '../api/getHourlyWeatherByCoords';
import { type HourlyWeatherData } from '../types/weather.types';
import HourlyWeatherTable from './HourlyWeatherTable';

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

  return (
    <section
      aria-label="Hourly weather forecast"
      className="mt-4 overflow-x-auto"
    >
      <HourlyWeatherTable hourly={hourly} />
    </section>
  );
}
