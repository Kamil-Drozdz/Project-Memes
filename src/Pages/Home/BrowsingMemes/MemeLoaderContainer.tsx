import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useFetch from '../../../hooks/useFetch';
import { useAuth } from '../../../hooks/useAuth';
import InfiniteScrollComponent from './InfinityScroll';
import { withLanguage } from '../../../HOC/withLanguage';

export interface UserReaction {
  id: string;
}

export interface Meme {
  id?: number;
  isLike: boolean;
  category: null | string;
  type: null | string;
  isNsfw: null | boolean;
  isUncropped: null | boolean;
  dislikeCount: number;
  likeCount: number;
  url: string;
  userReaction: UserReaction;
}

interface PropsAuth {
  email?: string | null;
  password?: string | null;
  userId: string | null;
  userNick?: string | null;
  token: string | null;
}

const MemeLoaderContainer: React.FC = ({ texts }: any) => {
  const [data, setData] = useState<Meme[]>([]);
  const [page, setPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState<boolean[]>([]);
  const [showArrow, setShowArrow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [lastUpdatedMeme, setLastUpdatedMeme] = useState(null);
  const [showComments, setShowComments] = useState<number | null>(null);
  const { data: memeFetching, isLoading, refetch } = useFetch(`${import.meta.env.VITE_APP_API_BASE_URL}memes/memes?page=${page}&limit=10`);
  const memeColections = memeFetching?._embedded?.items;
  const { auth } = useAuth() as { auth: PropsAuth };

  const loadMoreMemes = () => {
    setPage(page + 1);
  };
  const handleImageLoaded = (index: number) => {
    setIsLoaded((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = true;
      return updatedState;
    });
  };

  useEffect(() => {
    if (auth.email) {
      refetch();
    }
  }, [auth.email]);

  useEffect(() => {
    if (memeColections) {
      setData((prevData) => [...prevData, ...memeColections]);
    } else return;
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showArrow]);

  useEffect(() => {
    if (!data.length) {
      const timer = setTimeout(() => {
        toast.warn(`${texts.notificationToastWarn}`, { autoClose: 5000 });
        setShowError(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [data]);

  const handleVoice = async (memeId: number, isLike: boolean) => {
    if (!auth.email) {
      toast.error(`${texts.logIn}`, { autoClose: 2000 });
      return;
    }
    const reaction = isLike ? 'like' : 'dislike';
    const apiUrl = `${import.meta.env.VITE_APP_API_BASE_URL}memes/memes/${memeId}/reactions`;

    const updateReaction = async (url: string, method = 'POST') => {
      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${auth.token}` }
      });

      if (!response.ok) {
        throw new Error(`Błąd API: ${response.status}`);
      }

      const updatedMeme = await response.json();
      setLastUpdatedMeme(updatedMeme);
      setData((prevData) => prevData.map((meme) => (meme.id === memeId ? updatedMeme : meme)));
    };
    try {
      await updateReaction(`${apiUrl}/${reaction}`);
      toast.success(isLike ? `${texts.notificationToastSuccesLike}` : `${texts.notificationToastSuccesDisLike}`, { autoClose: 500 });
    } catch (error) {
      await updateReaction(`${apiUrl}/reset`);
      toast.warn(`${texts.notificationToastReset}`, { autoClose: 500 });
    }
  };

  const handleComments = (memeId: number) => {
    if (showComments === memeId) {
      setShowComments(null);
    } else {
      setShowComments(memeId);
    }
  };

  const handleScroll = () => {
    if (window.pageYOffset > 50 && !showArrow) {
      setShowArrow(true);
    } else if (window.pageYOffset <= 50 && showArrow) {
      setShowArrow(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <InfiniteScrollComponent data={data} showArrow={showArrow} loadMoreMemes={loadMoreMemes} isLoaded={isLoaded} showError={showError} handleImageLoaded={handleImageLoaded} lastUpdatedMeme={lastUpdatedMeme} showComments={showComments} handleClick={handleClick} handleVoice={handleVoice} handleComments={handleComments} />;
};

export default withLanguage(MemeLoaderContainer);
