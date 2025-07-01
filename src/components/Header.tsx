import sunbearLogo from '../assets/sunbear.svg';
import type { ReactNode } from 'react';

export default function Header({
  currentWeather,
}: {
  currentWeather?: ReactNode;
}) {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-20 flex items-center px-6 py-4 justify-between">
      <div className="flex items-center">
        <img src={sunbearLogo} alt="SunBear logo" className="h-14 w-14 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800 mr-6">
          SunBear Weather
        </h1>
      </div>
      {currentWeather && (
        <div className="flex items-center flex-shrink-0 min-w-0 [@media(max-width:400px)]:ml-8">
          {currentWeather}
        </div>
      )}
    </header>
  );
}
