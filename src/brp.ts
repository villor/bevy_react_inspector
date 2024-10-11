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
    throw new Error(`${data.error.code}: ${data.error.message}`);
  }

  return data.result as TResult;
}

// callBrp('/brp', 'bevy/list', null).then(result => console.log(result));
