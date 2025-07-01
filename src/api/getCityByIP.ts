export default async function getCityByIP(): Promise<string> {
  const res = await fetch('https://ip-api.io/json/');

  const statusMessages: Record<number, string> = {
    404: 'IP address not found',
    429: "Couldn't find your city automatically - Please try manual search",
    500: 'Internal server error',
  };

  if (!res.ok) {
    const errorMessage =
      statusMessages[res.status] || `Unexpected error: ${res.status}`;
    throw new Error(errorMessage);
  }

  const data = await res.json();

  if (data && data.city) {
    return data.city;
  }
  throw new Error('Could not determine location by IP');
}
