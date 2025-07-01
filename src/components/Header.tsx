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
        <span className="text-2xl font-bold text-gray-800">
          SunBear Weather
        </span>
      </div>
      {currentWeather && (
        <div className="flex items-center">{currentWeather}</div>
      )}
    </header>
  );
}
