import { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import CurrentWeather from './components/CurrentWeather';
import HourlyWeather from './components/HourlyWeather';
import Loading from './components/Loading';
import SevenDayForecast from './components/SevenDayForecast';
import getCoordsByCity from './api/getCoordsByCity';
import getWeatherByCoords from './api/getWeatherByCoords';
import type {
  HourlyWeatherData,
  DailyWeatherData,
} from './types/weather.types';

function App() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [submittedCity, setSubmittedCity] = useState('');
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherData[]>([]);
  const [dailyWeather, setDailyWeather] = useState<DailyWeatherData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedCity(city);
    setLoading(true);
    setError(null);
    try {
      const coords = await getCoordsByCity(city);
      const { hourly, daily } = await getWeatherByCoords(
        coords.lat,
        coords.lon
      );
      setHourlyWeather(hourly);
      setDailyWeather(daily);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not fetch weather.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-100">
      <Header />
      <div className="w-full flex flex-col items-center">
        <SearchForm city={city} setCity={setCity} onSubmit={handleSubmit} />
        <Loading loading={loading} />
        {error && (
          <div className="bg-red-50 p-4 rounded-md border border-red-200 mt-4">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}
        <div className="mt-8 w-full max-w-sm">
          {submittedCity && (
            <CurrentWeather city={submittedCity} setLoading={setLoading} />
          )}
        </div>
        <div className="mt-8 w-full max-w-2xl">
          {dailyWeather.length > 0 && <SevenDayForecast daily={dailyWeather} />}
        </div>
        <div className="mt-8 w-full max-w-2xl">
          {hourlyWeather.length > 0 && <HourlyWeather hourly={hourlyWeather} />}
        </div>
      </div>
    </div>
  );
}

export default App;
