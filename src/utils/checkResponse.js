const checkResponse = async (res) => {
  const data = await res.json();
  
  if (res.ok) return data;
  throw new Error(data.message);
};

export default checkResponse;