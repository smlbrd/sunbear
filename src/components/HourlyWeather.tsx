import type { HourlyWeatherProps } from '../types/weather.types';
import HourlyWeatherTable from './HourlyWeatherTable';
import { getDayHourlySlice } from '../utils/getDayHourlySlice';

export default function HourlyWeather({
  hourlyWeather,
  selectedDay,
  timezone,
}: HourlyWeatherProps) {
  const hourlySlice = getDayHourlySlice(hourlyWeather, selectedDay, timezone);

  if (!hourlySlice.length) return null;

  return (
    <section
      aria-label="Hourly weather forecast"
      className="overflow-x-auto mb-6"
    >
      <h2 className="sr-only">Hourly Forecast</h2>
      <div className="px-6">
        <HourlyWeatherTable hourly={hourlySlice} timezone={timezone} />
      </div>
    </section>
  );
}
