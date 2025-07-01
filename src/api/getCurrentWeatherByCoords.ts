import { type CurrentWeatherData } from '../types/weather.types';

const getCurrentWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<CurrentWeatherData> => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await res.json();

  if (!data.current_weather) {
    throw new Error('Weather data not found');
  }

  return {
    temperature: data.current_weather.temperature,
    weathercode: data.current_weather.weathercode,
  };
};

export default getCurrentWeatherByCoords;
