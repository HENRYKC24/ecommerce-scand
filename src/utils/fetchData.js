const fetchData = async (query) => {
  const endpoint = 'http://localhost:4000/';
  const method = 'POST';
  const headers = {
    'Content-Type': 'application/json',
  };

  const result = await fetch(endpoint, {
    method,
    headers,
    body: JSON.stringify({
      query,
    }),
  });
  const data = await result.json();
  return data;
};

export default fetchData;
