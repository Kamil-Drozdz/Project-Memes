import { useQuery } from 'react-query';
import { useAuth } from '../hooks/useAuth';

const useFetch = (url) => {
  const { auth } = useAuth();
  const { data, refetch, isLoading, isError, status } = useQuery(url, async () => {
    if (!auth.token) {
      return;
    }
    const response = await fetch(url, {
      headers: {
        Authorization: ` Bearer ${auth.token}`
      }
    });
    const result = await response.json();
    return result;
  });

  return { data, refetch, isLoading, isError, status };
};

export default useFetch;
