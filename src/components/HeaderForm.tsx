type HeaderFormProps = {
  city: string;
  setCity: (city: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function HeaderForm({
  city,
  setCity,
  onSubmit,
}: HeaderFormProps) {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-10">
      <form
        onSubmit={onSubmit}
        className="flex flex-col sm:flex-row justify-center gap-2 max-w-2xl mx-auto p-4"
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
    </header>
  );
}
