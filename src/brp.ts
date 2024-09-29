export const DEFAULT_URL = import.meta.env.DEV ? '/brp' : 'http://localhost:15702';

export async function callBrp<TResult = any>(url: string, method: string, params: any) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      method,
      params,
    }),
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    console.error('Request failed', response.status, data.error);
    throw new Error('Request failed');
  }

  return data.result as TResult;
}

// callBrp(DEFAULT_URL, 'bevy/list', null).then(result => console.log(result));
