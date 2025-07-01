export default async function getCityByIP(): Promise<string> {
  const res = await fetch('https://ip-api.io/json/');
  const data = await res.json();

  if (data && data.city) {
    return data.city;
  }
  throw new Error('Could not determine location by IP');
}
