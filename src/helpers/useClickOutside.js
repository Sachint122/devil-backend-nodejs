import { useEffect, useRef } from 'react';
import { useApi } from './useApi.js';

export const useClickOutside = (onClose, options = {}) => {
  const { apiFn, setData, revertData } = options;
  // apiFn  = () => api.post('/save', body)  — user dega
  // setData = setPosts                       — user ka setState
  // revertData = previous data              — revert ke liye

  const ref = useRef(null);
  const { get, post, patch, put, del } = useApi();

  useEffect(() => {
    const handler = async (e) => {
      if (ref.current && !ref.current.contains(e.target)) {

        if (apiFn && setData && revertData !== undefined) {
          // Step 1 - UI already updated hai (user ne pehle kiya)
          try {
            // Step 2 - API call
            await apiFn();
          } catch (err) {
            // Step 3 - Fail → Revert
            setData(revertData);
          }
        }

        onClose();
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose, apiFn]);

  return { ref };
};
