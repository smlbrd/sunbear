import { useEffect, useState } from 'react';
import getCoordsByCity from '../api/getCoordsByCity';
import getCurrentWeatherByCoords from '../api/getCurrentWeatherByCoords';
import type {
  CurrentWeatherData,
  CurrentWeatherProps,
} from '../types/weather.types';
import { weatherCodeToDescription } from '../utils/weathercodeToDescription';
import { weatherCodeToIcon } from '../utils/weathercodeToIcon';
import Loading from './Loading';

export default function CurrentWeatherWidget({ city }: CurrentWeatherProps) {
  const [weather, setWeather] = useState<CurrentWeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!city) return;
    let ignore = false;
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const coords = await getCoordsByCity(city);
        const currentWeather = await getCurrentWeatherByCoords(
          coords.lat,
          coords.lon
        );
        if (!ignore) setWeather(currentWeather);
      } catch {
        if (!ignore) setWeather(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchWeather();
    return () => {
      ignore = true;
    };
  }, [city]);

  return (
    <>
      <div
        className="flex items-center min-w-[140px] min-h-[48px] px-6 m-3 bg-transparent text-gray-800 cw-xs"
        style={{ boxSizing: 'border-box' }}
      >
        {loading ? (
          <Loading loading={loading} />
        ) : weather ? (
          <>
            <h1 className="mr-2 cw-city">{city}</h1>
            <img
              src={`/weathercode-icons/${weatherCodeToIcon(
                weather.weathercode
              )}.svg`}
              alt={weatherCodeToDescription(weather.weathercode)}
              className="w-10 h-10 mr-2 cw-icon"
              loading="lazy"
            />
            <span className="font-semibold text-lg mr-2 cw-temp">
              {Math.round(weather.temperature)}°C
            </span>
          </>
        ) : null}
      </div>
    </>
  );
}
