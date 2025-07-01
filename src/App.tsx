import { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import CurrentWeather from './components/CurrentWeather';
import HourlyWeather from './components/HourlyWeather';
import Loading from './components/Loading';

function App() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [submittedCity, setSubmittedCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedCity(city);
  };

  return (
    <div className="pt-24 flex flex-col items-center min-h-screen bg-gray-100">
      <Header />
      <SearchForm city={city} setCity={setCity} onSubmit={handleSubmit} />
      <Loading loading={loading} />
      <div className="mt-8 w-full max-w-md">
        {submittedCity && (
          <CurrentWeather city={submittedCity} setLoading={setLoading} />
        )}
      </div>
      <div className="mt-8 w-full max-w-md">
        {submittedCity && (
          <HourlyWeather city={submittedCity} setLoading={setLoading} />
        )}
      </div>
    </div>
  );
}

export default App;
