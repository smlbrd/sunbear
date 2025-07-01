import type { HourlyWeatherProps } from '../types/weather.types';
import HourlyWeatherTable from './HourlyWeatherTable';

export default function HourlyWeather({
  hourlyWeather,
  selectedDay,
}: HourlyWeatherProps) {
  const hoursPerDay = 24;
  const startIndex = selectedDay * hoursPerDay;
  const endIndex = startIndex + hoursPerDay;
  const hourlySlice = hourlyWeather.slice(startIndex, endIndex);

  if (!hourlySlice.length) return null;

  return (
    <section
      aria-label="Hourly weather forecast"
      className="mt-4 overflow-x-auto"
    >
      <h2 className="sr-only">Hourly Forecast</h2>
      <HourlyWeatherTable hourly={hourlySlice} />
    </section>
  );
}
