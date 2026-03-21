import { useState, useCallback } from 'react';

export const useOptimistic = (initialData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const optimisticUpdate = useCallback(async (id, updates, apiFn) => {
    const previousData = data;

    setData((prev) =>
      updates === null
        ? prev.filter((e) => e._id !== id)
        : prev.map((e) => e._id === id ? { ...e, ...updates } : e)
    );

    setError(null);
    setLoading(true);

    try {
      const result = await apiFn();
      return result;
    } catch (err) {
      setData(previousData);
      const message = err?.response?.data?.message || err?.message || 'Something went wrong';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [data]);

  const setOptimisticData = useCallback((newData) => {
    setData(newData);
  }, []);

  return { data, loading, error, optimisticUpdate, setOptimisticData };
};
