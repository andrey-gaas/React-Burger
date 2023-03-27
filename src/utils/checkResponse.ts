const checkResponse = async <TResponse>(res: any) => {
  const data = await res.json();

  if (res.ok) return data as TResponse;
  throw new Error(data.message);
};

export default checkResponse;