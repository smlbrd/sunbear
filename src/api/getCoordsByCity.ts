const getCoordsByCity = async (
  city: string
): Promise<{ lat: number; lon: number }> => {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch coordinates');
  }

  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error('Cannot find coordinates for the specified city');
  }

  return {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude,
  };
};

export default getCoordsByCity;
