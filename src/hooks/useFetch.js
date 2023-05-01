import { useQuery } from 'react-query';
import Cookies from 'js-cookie';

//especially the use of get cookies for the application to work as intended, however, in this endpoint it is required to have a token, and auth is set only when logging in and reloading

const useFetch = (url) => {
  const token = Cookies.get('token');
  const { data, refetch, isLoading } = useQuery(
    url,
    async () => {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    },
    {
      refetchOnWindowFocus: false
    }
  );

  return { data, refetch, isLoading };
};

export default useFetch;
