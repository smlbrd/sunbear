import type {
  DailyWeatherData,
  SevenDayForecastProps,
} from '../types/weather.types';
import { weatherCodeToDescription } from '../utils/weathercodeToDescription';
import { weatherCodeToIcon } from '../utils/weathercodeToIcon';
import { formatInTimeZone } from 'date-fns-tz';

export default function SevenDayForecast({
  dailyWeather,
  selectedDay,
  setSelectedDay,
  timezone,
}: SevenDayForecastProps) {
  return (
    <section>
      <h2 className="sr-only">7-Day Forecast</h2>
      <div className="max-w-max mx-auto">
        <div
          className="
          flex items-end p-2
          lg:overflow-x-visible
          lg:grid lg:grid-cols-8 lg:min-w-28 lg:h-48
        "
        >
          {dailyWeather.map((day: DailyWeatherData, i: number) => (
            <button
              key={day.time}
              className={`
              flex flex-col items-center
              border border-gray-200 
              transition-colors duration-150
              min-w-24
              h-44 p-4
              lg:px-6
              ${
                selectedDay === i
                  ? 'lg:col-span-2 lg:h-48 ring-2 bg-white ring-blue-500 border-blue-500 z-10'
                  : 'lg:col-span-1 lg:h-44 bg-gray-50 hover:border-blue-300'
              }
              ${i === 0 ? 'rounded-l-lg' : ''}
              ${i === dailyWeather.length - 1 ? 'rounded-r-lg' : ''}
            `}
              type="button"
              onClick={() => setSelectedDay(i)}
              aria-pressed={selectedDay === i}
              aria-label={`Select forecast for ${formatInTimeZone(
                day.time,
                timezone,
                'EEEE d MMM'
              )}`}
            >
              <span className="text-sm text-gray-500 mb-1">
                {formatInTimeZone(day.time, timezone, 'EEE d MMM')}
              </span>
              <img
                src={`/weathercode-icons/${weatherCodeToIcon(
                  day.weatherCode
                )}.svg`}
                alt={weatherCodeToDescription(day.weatherCode)}
                className="w-12 h-12 sm:w-12 sm:h-12 mb-1"
                loading="lazy"
              />
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-600 mb-1">
                {Math.round(day.temperatureMax)}°C
              </span>
              <span className="text-sm md:text-md lg:text-lg text-gray-500 mb-1">
                {Math.round(day.apparentTemperatureMax)}°C
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
