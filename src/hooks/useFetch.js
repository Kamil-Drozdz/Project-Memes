import { useQuery } from 'react-query';
import Cookies from 'js-cookie';

const useFetch = (url) => {
  const token = Cookies.get('token');
  const { data, refetch, isLoading } = useQuery(
    url,
    async () => {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(url, {
        headers
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
