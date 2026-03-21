import axios from 'axios';

export const useApi = (baseURL = '') => {
  const request = (method, url, body) =>
    axios({
      method,
      url: `${baseURL}${url}`,
      data: body,
      withCredentials: true,
    }).then(res => res.data);

  return {
    get:   (url)       => request('GET', url),
    post:  (url, body) => request('POST', url, body),
    patch: (url, body) => request('PATCH', url, body),
    put:   (url, body) => request('PUT', url, body),
    del:   (url)       => request('DELETE', url),
  };
};
