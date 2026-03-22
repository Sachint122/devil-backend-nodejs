import axios from 'axios';
import { getApiConfig, updateToken, clearToken as clearGlobal } from './apiConfig';
import { useApiContext } from './ApiProvider';

export const useApi = () => {
  let context = null;
  try { context = useApiContext(); } catch (_) { }

  const request = (method, url, body) => {
    const { baseURL, token } = getApiConfig();
    const finalBaseURL = context?.baseURL ?? baseURL;
    const finalToken = context?.authToken ?? token;

    const headers = {};
    if (finalToken) headers['Authorization'] = `Bearer ${finalToken}`;

    return axios({
      method,
      url: `${finalBaseURL}${url}`,
      data: body,
      headers,
      withCredentials: true,
    }).then(res => res.data);
  };

  const setAuthToken = (token) => {
    updateToken(token);
    context?.setAuthToken?.(token);
  };

  const clearToken = () => {
    clearGlobal();
    context?.setAuthToken?.(null);
  };

  return {
    get: (url) => request('GET', url),
    post: (url, body) => request('POST', url, body),
    patch: (url, body) => request('PATCH', url, body),
    put: (url, body) => request('PUT', url, body),
    del: (url) => request('DELETE', url),
    setAuthToken,
    clearToken,
  };
};
