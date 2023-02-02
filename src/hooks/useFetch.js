import { useQuery } from 'react-query';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

const useFetch = (url) => {
  const { auth } = useAuth();
  const { data, refetch, isLoading, isError, status } = useQuery(url, async () => {
    const response = await axios.get(url, {
      headers: {
        Authorization: ` Bearer ${auth.token}`
      }
    });
    const result = response.data;
    return result;
  });

  return { data, refetch, isLoading, isError, status };
};

export default useFetch;
