import { useState, useEffect, useRef, useCallback } from 'react';
import { useApi } from './useApi.js';

export const useInfiniteScroll = (url, setData, limit = 10) => {
  const [page, setPage]       = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const observerRef           = useRef(null);

  const { get } = useApi();

  const fetchPage = async (pageNum) => {
    if (!hasMore || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res     = await get(`${url}?page=${pageNum}&limit=${limit}`);
      const newData = res?.data || res || [];
      const total   = res?.pagination?.total || 0;

      setData((prev) => {
        const updated = [...prev, ...newData];
        setHasMore(updated.length < total);
        return updated;
      });
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(page);
  }, [page]);

  const lastElementRef = useCallback((node) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  const reset = () => {
    setData([]);
    setPage(1);
    setHasMore(true);
  };

  return { loading, error, hasMore, lastElementRef, reset };
};
