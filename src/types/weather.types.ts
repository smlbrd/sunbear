export type WeatherProps = {
  city: string;
  date?: string;
};

export type WeatherData = {
  temperature: number;
  weathercode: number;
  humidity?: number;
};
