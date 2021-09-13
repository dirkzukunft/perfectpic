import fetch from 'node-fetch';
import timeoutSignal from 'timeout-signal';

export type requests = { url: string; key: string }[];

export default async function fetchJSONsAsync<T>(requests: requests): Promise<T[]> {
  const results = await Promise.allSettled(
    requests.map(async ({ url, key }) => {
      try {
        const response = await fetch(url, {
          headers: key ? { Authorization: key } : {},
          signal: timeoutSignal(2000),
        });
        const result = await response.json();
        return result;
      } catch (err) {
        console.error(`Fetching URL ${url} failed: ${err}`);
        return;
      }
    })
  );

  const values = results.map((result) => {
    if (result.status === 'fulfilled') return result.value as T;
    return {} as T;
  });

  return values;
}
