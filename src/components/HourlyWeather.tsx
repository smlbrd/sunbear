import type { HourlyWeatherData } from '../types/weather.types';
import HourlyWeatherTable from './HourlyWeatherTable';

export default function HourlyWeather({
  hourly,
}: {
  hourly: HourlyWeatherData[];
}) {
  if (!hourly.length) return null;

  return (
    <section
      aria-label="Hourly weather forecast"
      className="mt-4 overflow-x-auto"
    >
      <HourlyWeatherTable hourly={hourly.slice(0, 24)} />
    </section>
  );
}
