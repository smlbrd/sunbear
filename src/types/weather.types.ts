export type CurrentWeatherProps = {
  city: string;
};

export type SevenDayForecastProps = {
  dailyWeather: DailyWeatherData[];
  timezone: string;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
};

export type HourlyWeatherProps = {
  hourlyWeather: HourlyWeatherData[];
  timezone: string;
  selectedDay: number;
};

export type WeatherApiResponse = {
  hourly: HourlyWeatherData[];
  daily: DailyWeatherData[];
  timezone: string;
};

export type CurrentWeatherData = {
  temperature: number;
  weathercode: number;
};

export type DailyWeatherData = {
  time: string;
  temperatureMax: number;
  apparentTemperatureMax: number;
  weatherCode: number;
};

export type HourlyWeatherData = {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitationProbability: number;
  uvIndex: number;
};
