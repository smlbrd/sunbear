export default async function getCityByIP(): Promise<string> {
  const res = await fetch('https://ip-api.io/json/');

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('IP address not found');
    }

    if (res.status === 429) {
      throw new Error(
        "Couldn't find your city automatically - Please try manual search"
      );
    }

    if (res.status === 500) {
      throw new Error('Internal server error');
    }
    throw new Error(`Unexpected error: ${res.status}`);
  }

  const data = await res.json();

  if (data && data.city) {
    return data.city;
  }
  throw new Error('Could not determine location by IP');
}
