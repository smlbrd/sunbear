import { formatInTimeZone } from 'date-fns-tz';
import type { HourlyWeatherData } from '../types/weather.types';

export function getDayHourlySlice(
  hourlyWeather: HourlyWeatherData[],
  selectedDay: number,
  timezone: string,
  hoursPerDay = 24
): HourlyWeatherData[] {
  const startIndex = selectedDay * hoursPerDay;
  const endIndex = startIndex + hoursPerDay;
  const daySlice = hourlyWeather.slice(startIndex, endIndex);

  const now = new Date();
  const nowLocal = formatInTimeZone(now, timezone, "yyyy-MM-dd'T'HH:00");
  const firstIndex = daySlice.findIndex((h) => {
    const hLocal = formatInTimeZone(h.time, timezone, "yyyy-MM-dd'T'HH:00");
    return hLocal >= nowLocal;
  });

  return firstIndex >= 0
    ? daySlice.slice(firstIndex, firstIndex + hoursPerDay)
    : daySlice.slice(0, hoursPerDay);
}
