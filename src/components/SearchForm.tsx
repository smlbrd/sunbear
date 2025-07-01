import type { SearchFormProps } from '../types/search.types';

export default function SearchForm({
  city,
  setCity,
  onSubmit,
}: SearchFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row justify-center gap-2 w-full lg:w-4/5 mx-auto p-4 mt-8"
    >
      <label htmlFor="city" className="sr-only">
        City Name
      </label>
      <input
        id="city"
        type="text"
        placeholder="Search for a city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent sm:w-4/5"
      />
      <button
        className={`bg-gradient-to-b from-blue-400 to-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium sm:w-1/8 ${
          !city.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-800'
        }`}
        type="submit"
        disabled={!city.trim()}
        aria-disabled={!city.trim()}
      >
        Search
      </button>
    </form>
  );
}
