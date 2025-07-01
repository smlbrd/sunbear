import type { DailyWeatherData } from '../types/weather.types';
import { weatherCodeToIcon } from '../utils/weathercodeToIcon';

export default function SevenDayForecast({
  daily,
}: {
  daily: DailyWeatherData[];
}) {
  return (
    <section className="mt-4 w-full">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 sr-only">
        7-Day Forecast
      </h2>
      <div
        className="
          flex gap-2
          overflow-x-auto
          lg:overflow-x-visible
          lg:grid lg:grid-cols-7
        "
      >
        {daily.map((day) => (
          <button
            key={day.time}
            className="flex flex-col items-center bg-white rounded-lg shadow p-3 w-full border border-gray-200"
            type="button"
            onClick={() => {
              console.log('Clicked!');
            }}
          >
            <span className="text-xs text-gray-500 mb-1">
              {new Date(day.time).toLocaleDateString(undefined, {
                weekday: 'short',
              })}
            </span>
            <img
              src={`/weathercode-icons/${weatherCodeToIcon(
                day.weatherCode
              )}.svg`}
              alt={`Weather icon for code ${day.weatherCode}`}
              className="w-12 h-12 mb-1"
            />
            <span className="text-2xl font-bold text-blue-700 mb-1">
              {Math.round(day.temperatureMax)}°C
            </span>
            <span className="text-xs text-gray-500 mb-1">
              Feels like {Math.round(day.apparentTemperatureMax)}°C
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
