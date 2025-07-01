export type WeatherProps = {
  city: string;
  date?: string;
};

export type SevenDayForecastProps = {
  daily: DailyWeatherData[];
  selectedDay: number;
  setSelectedDay: (day: number) => void;
};

export type CurrentWeatherData = {
  temperature: number;
  weathercode: number;
  humidity?: number;
};

export type WeatherApiResponse = {
  hourly: HourlyWeatherData[];
  daily: DailyWeatherData[];
};

export type HourlyWeatherData = {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitationProbability: number;
  uvIndex: number;
};

export type DailyWeatherData = {
  time: string;
  temperatureMax: number;
  apparentTemperatureMax: number;
  weatherCode: number;
};
