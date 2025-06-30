import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import HeaderForm from './components/HeaderForm';

function App() {
  const [city, setCity] = useState('');
  const [submittedCity, setSubmittedCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedCity(city);
  };

  return (
    <div className="pt-24 flex flex-col items-center min-h-screen bg-gray-100">
      <HeaderForm city={city} setCity={setCity} onSubmit={handleSubmit} />
      <div className="mt-8 w-full max-w-md">
        {submittedCity && <CurrentWeather city={submittedCity} />}
      </div>
    </div>
  );
}

export default App;
