import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useFetch from '../../../hooks/useFetch';
import { useAuth } from '../../../hooks/useAuth';
import InfiniteScrollComponent from './InfinityScroll';
import { withLanguage } from '../../../HOC/withLanguage';
import { useNavigate } from 'react-router-dom';
import { useMemeVote } from '../../../hooks/useMemeVote';

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

const MemeLoaderContainer: React.FC = ({ texts }: any) => {
  let navigate = useNavigate();

  const [data, setData] = useState<Meme[]>([]);
  const [page, setPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState<boolean[]>([]);
  const [showArrow, setShowArrow] = useState(false);
  const [showError, setShowError] = useState(false);

  const [showComments, setShowComments] = useState<number | null>(null);
  const { data: memeFetching, isLoading, refetch } = useFetch(`${import.meta.env.VITE_APP_API_BASE_URL}memes/memes?page=${page}&limit=10`);
  const memeColections = memeFetching?._embedded?.items;
  const { auth } = useAuth();
  const handleVoice = useMemeVote(texts, (updatedMeme: Meme) => {
    setData((prevData) => prevData.map((meme) => (meme.id === updatedMeme.id ? updatedMeme : meme)));
  });
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

  const handleMemeClick = (id: number) => {
    navigate(`/meme/${id}`);
  };

  return <InfiniteScrollComponent {...{ data, loadMoreMemes, handleMemeClick, isLoaded, showError, handleImageLoaded, showComments, showArrow, handleClick, handleVoice, handleComments }} />;
};

export default withLanguage(MemeLoaderContainer);
