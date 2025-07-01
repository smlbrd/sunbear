export type WeatherProps = {
  city: string;
  date?: string;
};

export type CurrentWeatherData = {
  temperature: number;
  weathercode: number;
  humidity?: number;
};

export type HourlyWeatherApiResponse = {
  time: string[];
  temperature_2m: number[];
  apparent_temperature: number[];
  relative_humidity_2m: number[];
  precipitation_probability: number[];
  uv_index: number[];
};

export type HourlyWeatherData = {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitationProbability: number;
  uvIndex: number;
};
