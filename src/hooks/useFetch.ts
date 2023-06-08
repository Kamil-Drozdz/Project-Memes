import { useQuery } from 'react-query';
import Cookies from 'js-cookie';

const useFetch = (url: string) => {
  const token = Cookies.get('token');
  const { data, refetch, isLoading } = useQuery(
    url,
    async () => {
      const response = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
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
