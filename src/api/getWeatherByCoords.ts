import type {
  HourlyWeatherData,
  DailyWeatherData,
  WeatherApiResponse,
} from '../types/weather.types';

const getWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherApiResponse> => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,uv_index&daily=temperature_2m_max,apparent_temperature_max,weather_code&timezone=auto`
  );

  if (!res.ok) throw new Error('Failed to fetch weather data');
  const data = await res.json();

  const hourly: HourlyWeatherData[] = data.hourly.time.map(
    (time: string, i: number) => ({
      time,
      temperature: data.hourly.temperature_2m[i],
      apparentTemperature: data.hourly.apparent_temperature[i],
      humidity: data.hourly.relative_humidity_2m[i],
      precipitationProbability: data.hourly.precipitation_probability[i],
      uvIndex: data.hourly.uv_index[i],
    })
  );

  const daily: DailyWeatherData[] = data.daily.time.map(
    (time: string, i: number) => ({
      time,
      temperatureMax: data.daily.temperature_2m_max[i],
      apparentTemperatureMax: data.daily.apparent_temperature_max[i],
      weatherCode: data.daily.weather_code[i],
    })
  );

  const timezone: string = data.timezone;

  return { hourly, daily, timezone };
};

export default getWeatherByCoords;
