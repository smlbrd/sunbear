import {
  type HourlyWeatherApiResponse,
  type HourlyWeatherData,
} from '../types/weather.types';

const getHourlyWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<HourlyWeatherData[]> => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,uv_index`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch hourly weather data');
  }

  const data = await res.json();

  if (!data.hourly) {
    throw new Error('Hourly weather data not found');
  }

  const hourly: HourlyWeatherApiResponse = data.hourly;

  return hourly.time.map((time, i) => ({
    time,
    temperature: hourly.temperature_2m[i],
    apparentTemperature: hourly.apparent_temperature[i],
    humidity: hourly.relative_humidity_2m[i],
    precipitationProbability: hourly.precipitation_probability[i],
    uvIndex: hourly.uv_index[i],
  }));
};

export default getHourlyWeatherByCoords;
