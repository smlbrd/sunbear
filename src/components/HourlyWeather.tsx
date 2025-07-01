import type { HourlyWeatherProps } from '../types/weather.types';
import HourlyWeatherTable from './HourlyWeatherTable';
import { formatInTimeZone } from 'date-fns-tz';

export default function HourlyWeather({
  hourlyWeather,
  selectedDay,
  timezone,
}: HourlyWeatherProps) {
  const hoursPerDay = 24;
  const startIndex = selectedDay * hoursPerDay;
  const endIndex = startIndex + hoursPerDay;
  const daySlice = hourlyWeather.slice(startIndex, endIndex);

  const now = new Date();
  const nowLocal = formatInTimeZone(now, timezone, "yyyy-MM-dd'T'HH:00");
  const firstIdx = daySlice.findIndex((h) => {
    const hLocal = formatInTimeZone(h.time, timezone, "yyyy-MM-dd'T'HH:00");
    return hLocal >= nowLocal;
  });

  const hourlySlice =
    firstIdx >= 0
      ? daySlice.slice(firstIdx, firstIdx + 24)
      : daySlice.slice(0, 24);

  if (!hourlySlice.length) return null;

  return (
    <section
      aria-label="Hourly weather forecast"
      className="mt-4 overflow-x-auto mb-6"
    >
      <h2 className="sr-only">Hourly Forecast</h2>
      <HourlyWeatherTable hourly={hourlySlice} timezone={timezone} />
    </section>
  );
}
