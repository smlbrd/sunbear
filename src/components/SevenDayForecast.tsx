import type {
  DailyWeatherData,
  SevenDayForecastProps,
} from '../types/weather.types';
import { weatherCodeToDescription } from '../utils/weathercodeToDescription';
import { weatherCodeToIcon } from '../utils/weathercodeToIcon';

export default function SevenDayForecast({
  daily,
  selectedDay,
  setSelectedDay,
}: SevenDayForecastProps) {
  return (
    <section className="mt-4 w-full">
      <h2 className="sr-only">7-Day Forecast</h2>
      <div
        className="
          flex overflow-x-auto
          lg:overflow-x-visible
          lg:grid lg:grid-cols-8 lg:items-end lg:h-48
        "
      >
        {daily.map((day: DailyWeatherData, i: number) => (
          <button
            key={day.time}
            className={`
              flex flex-col justify-center items-center bg-white rounded-none shadow
              border border-gray-200 w-full flex-1
              transition-all duration-200
              px-2
              ${
                selectedDay === i
                  ? 'lg:col-span-2 lg:h-48 h-44 ring-2 ring-blue-500 border-blue-500 z-10'
                  : 'lg:col-span-1 lg:h-44 h-40 hover:border-blue-300'
              }
              ${i === 0 ? 'rounded-l-lg' : ''}
              ${i === daily.length - 1 ? 'rounded-r-lg' : ''}
            `}
            type="button"
            onClick={() => setSelectedDay(i)}
            tabIndex={0}
            aria-pressed={selectedDay === i}
            aria-label={`Select forecast for ${new Date(
              day.time
            ).toLocaleDateString(undefined, {
              weekday: 'long',
              day: 'numeric',
              month: 'short',
            })}`}
          >
            <span className="text-xs text-gray-500 mb-1">
              {(() => {
                const date = new Date(day.time);
                const weekday = date.toLocaleDateString(undefined, {
                  weekday: 'short',
                });
                const dayNum = date.getDate();
                const month = date.toLocaleDateString(undefined, {
                  month: 'short',
                });
                return `${weekday} ${dayNum} ${month}`;
              })()}
            </span>
            <img
              src={`/weathercode-icons/${weatherCodeToIcon(
                day.weatherCode
              )}.svg`}
              alt={weatherCodeToDescription(day.weatherCode)}
              className="w-12 h-12 mb-1"
            />
            <span className="text-2xl font-bold text-gray-600 mb-1">
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
