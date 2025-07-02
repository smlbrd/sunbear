import { useEffect, useState } from 'react';
import getCityByIP from './api/getCityByIP';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import CurrentWeatherWidget from './components/CurrentWeatherWidget';
import HourlyWeather from './components/HourlyWeather';
import SevenDayForecast from './components/SevenDayForecast';
import getCoordsByCity from './api/getCoordsByCity';
import getWeatherByCoords from './api/getWeatherByCoords';
import type {
  HourlyWeatherData,
  DailyWeatherData,
} from './types/weather.types';
import SevenDayForecastSkeleton from './components/SevenDayForecastSkeleton';
import HourlyWeatherTableSkeleton from './components/HourlyWeatherTableSkeleton';

function App() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [submittedCity, setSubmittedCity] = useState('');
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherData[]>([]);
  const [dailyWeather, setDailyWeather] = useState<DailyWeatherData[]>([]);
  const [timezone, setTimezone] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityToFetch: string) => {
    setSubmittedCity(cityToFetch);
    setLoading(true);
    setError(null);
    try {
      const coords = await getCoordsByCity(cityToFetch);
      const { hourly, daily, timezone } = await getWeatherByCoords(
        coords.lat,
        coords.lon
      );
      setHourlyWeather(hourly);
      setDailyWeather(daily);
      setTimezone(timezone);
      setSelectedDay(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not fetch weather.');
      setSubmittedCity('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCityByIP()
      .then((detectedCity) => {
        setCity(detectedCity);
        fetchWeather(detectedCity);
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : 'Could not fetch weather.'
        );
        setSubmittedCity('');
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-100">
      <Header
        currentWeather={
          submittedCity ? <CurrentWeatherWidget city={submittedCity} /> : null
        }
      />
      <div className="w-full flex flex-col items-center">
        <SearchForm city={city} setCity={setCity} onSubmit={handleSubmit} />
        {error && (
          <div className="bg-red-50 p-4 rounded-md border border-red-200 mt-4">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}
        <div className="mt-8 w-full max-w-5xl p-4">
          {loading ? (
            <SevenDayForecastSkeleton />
          ) : (
            dailyWeather.length > 0 && (
              <SevenDayForecast
                dailyWeather={dailyWeather}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                timezone={timezone}
              />
            )
          )}
        </div>
        <div className="w-full max-w-5xl">
          {loading ? (
            <HourlyWeatherTableSkeleton columns={8} />
          ) : (
            hourlyWeather.length > 0 && (
              <HourlyWeather
                hourlyWeather={hourlyWeather}
                selectedDay={selectedDay}
                timezone={timezone}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
