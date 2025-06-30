import { useEffect, useState } from 'react';
import getCoordsByCity from '../api/getCoordsByCity';
import getCurrentWeatherByCoords from '../api/getCurrentWeatherByCoords';
import { type WeatherData, type WeatherProps } from '../types/weather.types';
import { weatherCodeToDescription } from '../utils/weathercodeToDescription';
import { weatherCodeToIcon } from '../utils/weathercodeToIcon';

export default function CurrentWeather({ city }: WeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const coords = await getCoordsByCity(city);
        const currentWeather = await getCurrentWeatherByCoords(
          coords.lat,
          coords.lon
        );

        setWeather(currentWeather);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Could not fetch weather.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  if (loading)
    return (
      <div className="flex justify-center items-center p-8">
        <img
          src="/public/loading.svg"
          alt="Loading..."
          className="w-12 h-12 animate-spin-slow"
        />
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 p-4 rounded-md border border-red-200">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );

  return (
    weather && (
      <div className="bg-gradient-to-b from-cyan-500 to-sky-700 rounded-lg shadow-lg p-6 text-white max-w-xl w-full">
        <div className="text-2xl font-semibold mb-4">{city}</div>

        <div className="mb-4 flex flex-row">
          <img
            src={`/weathercode-icons/${weatherCodeToIcon(
              weather.weathercode
            )}.svg`}
            alt={weatherCodeToDescription(weather.weathercode)}
            className="w-20 h-20 mr-4"
          />
          <div className="text-4xl font-semibold mb-2 flex items-center">
            {Math.round(weather.temperature)}°C
          </div>
        </div>
      </div>
    )
  );
}
