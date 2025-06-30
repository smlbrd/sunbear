import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';

function App() {
  const [city, setCity] = useState('');
  const [submittedCity, setSubmittedCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedCity(city);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-center gap-2"
      >
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700 mb-1 sr-only"
        >
          City Name
        </label>
        <input
          id="city"
          type="text"
          placeholder="Search for a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
        />
        <button
          className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
          type="submit"
          disabled={!city.trim()}
        >
          Continue
        </button>
      </form>

      <div className="mt-8 w-full max-w-md">
        {submittedCity && <CurrentWeather city={submittedCity} />}
      </div>
    </div>
  );
}

export default App;
