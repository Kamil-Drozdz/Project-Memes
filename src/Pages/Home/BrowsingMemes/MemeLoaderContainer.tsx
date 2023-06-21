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
  const [copiedMemeId, setCopiedMemeId] = useState<number | null>(null);
  const [showComments, setShowComments] = useState<number | null>(null);
  const { data: memeFetching, isLoading, refetch } = useFetch(`${process.env.VITE_APP_API_BASE_URL}memes/memes?page=${page}&limit=10`);
  const memeCollections = memeFetching?._embedded?.items;
  const { auth } = useAuth();

  const handleVoice = useMemeVote({
    texts,
    updateMeme: (updatedMeme: Meme) => {
      setData((prevData) => prevData.map((meme) => (meme.id === updatedMeme.id ? updatedMeme : meme)));
    }
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
    if (memeCollections) {
      setData((prevData) => [...prevData, ...memeCollections]);
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

  const handleCopy = (id: number) => {
    navigator.clipboard
      .writeText(`${window.location.href}meme/${id}`)
      .then(() => {
        toast.success(`${texts.linkCopied}`, { autoClose: 1000 });
        setCopiedMemeId(id);
        setTimeout(() => {
          setCopiedMemeId(null);
        }, 5000);
      })
      .catch(() => {
        toast.success(`${texts.linkCopiedError}`, { autoClose: 1000 });
      });
  };
  const handleMemeClick = (id: number) => {
    navigate(`/meme/${id}`);
  };

  return <InfiniteScrollComponent {...{ data, loadMoreMemes, handleCopy, copiedMemeId, handleMemeClick, isLoaded, showError, handleImageLoaded, showComments, showArrow, handleClick, handleVoice, handleComments }} />;
};

export default withLanguage(MemeLoaderContainer);
