import { useState, useEffect } from 'react';
import { useApi } from './useApi.js';

export const useFetch = (url) => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const { get } = useApi();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await get(url);
      setData(res);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};
