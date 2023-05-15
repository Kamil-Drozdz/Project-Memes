import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useFetch from '../../hooks/useFetch';
import { toast, ToastContainer } from 'react-toastify';
import photoError from '../../assets/error.png';
import { FadeLoader } from 'react-spinners';
import { TfiArrowUp } from 'react-icons/tfi';
import { BiCommentAdd } from 'react-icons/bi';
import { AiFillLike, AiOutlineLike, AiFillDislike, AiOutlineDislike } from 'react-icons/ai';
import { withLanguage } from '../../components/HOC/withLanguage';
import Comments from './Comments';
import { useAuth } from '../../hooks/useAuth';
import Ads from '../../payments/Ads';
import SkeletonLoader from '../../components/SkeletonLoader';

const BrowsingMemes = ({ texts }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState([]);
  const [showArrow, setShowArrow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [lastUpdatedMeme, setLastUpdatedMeme] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const { data: memeFetching, isLoading, refetch } = useFetch(`${process.env.REACT_APP_API_BASE_URL}memes/memes?page=${page}&limit=10`);
  const memeColections = memeFetching?._embedded?.items;
  const { auth } = useAuth();

  const loadMoreMemes = () => {
    setPage(page + 1);
  };

  const handleImageLoaded = (index) => {
    setIsLoaded((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = true;
      return updatedState;
    });
  };

  //adding a check if the user is up for data refetch in order to update the user's reaction
  useEffect(() => {
    if (auth.email) {
      refetch();
    }
  }, [auth.email]);

  //sets the state of the data to static, because when fetching with useFetch sometimes there is undefined data which will move to the top of the page, using state to store api data statically fixes the problem
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

  const handleVoice = async (memeId, isLike) => {
    if (!auth.email) {
      toast.error(`${texts.logIn}`, { autoClose: 2000 });
      return;
    }
    const reaction = isLike ? 'like' : 'dislike';
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}memes/memes/${memeId}/reactions`;

    const updateReaction = async (url, method = 'POST') => {
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

  const handleComments = (memeId) => {
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

  return showError ? (
    <div className="flex items-center justify-center border border-gray-700 bg-gray-700 pt-20 shadow-md">
      <img className="m-8 max-h-full min-h-0 max-w-full rounded-t-lg border-4 md:rounded" src={photoError} alt="error" />
      <ToastContainer position="bottom-left" hideProgressBar={false} limit={1} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  ) : (
    <>
      <InfiniteScroll dataLength={data.length} loader={<FadeLoader className="my-6 h-full w-full text-red-600" color="orange" />} hasMore={true} next={loadMoreMemes} scrollThreshold={0.8} className="flex min-h-[83vh] flex-col items-center justify-center bg-gray-700 shadow-lg ">
        {!!data.length && (
          <div className="top-96 -z-0 flex w-full items-center justify-center px-36 md:fixed md:justify-between">
            <Ads />
            <div className="hidden md:block">
              <Ads />
            </div>
          </div>
        )}
        {data?.map((meme, index) => (
          <div className="w-full bg-gray-900 px-4 md:w-[40vw]" key={index}>
            {!isLoaded[index] && <SkeletonLoader />}
            <div className={`${isLoaded[index] ? 'block' : 'hidden'}`}>
              <div className="m-2 flex w-full items-center justify-center rounded-lg shadow-lg">{meme.url.endsWith('.mp4') || meme.url.endsWith('.avi') ? <video className="mb-12 w-full rounded-lg border-4 object-contain md:rounded" onLoad={() => handleImageLoaded(index)} src={meme.url} alt="random meme video" controls /> : <img onLoad={() => handleImageLoaded(index)} className="mr-3 w-full rounded-lg border-4 object-contain md:rounded" src={meme.url} alt="random meme" />}</div>
              <div className="mx-2 mb-8 flex">
                <button onClick={() => handleVoice(meme.id, true)} className="z-[2] rounded border-b-4 border-green-800 bg-green-700 px-[6px] font-bold text-white shadow-lg hover:border-green-500 hover:bg-green-400">
                  {meme?.userReaction?.id === 'like' ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
                </button>
                <button onClick={() => handleVoice(meme.id, false)} className="z-[2] mx-1 w-fit rounded border-b-4 border-red-800 bg-red-700 px-[6px] font-bold text-white shadow-lg hover:border-red-500 hover:bg-red-400">
                  {meme?.userReaction?.id === 'dislike' ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}
                </button>
                <p className="rounded bg-gray-700 px-[10px] font-bold text-white">{lastUpdatedMeme && lastUpdatedMeme.id === meme.id ? lastUpdatedMeme.likeCount - lastUpdatedMeme.dislikeCount : (meme.likeCount || 0) - (meme.dislikeCount || 0)}</p>
                <button className="z-[2] ml-1 rounded border-b-4 border-orange-800 bg-orange-700 px-2 font-bold text-black shadow-lg" onClick={() => handleComments(meme.id)}>
                  <BiCommentAdd className="my-1" />
                </button>
              </div>
            </div>
            {showComments === meme.id && <Comments id={meme.id} />}
          </div>
        ))}
        {showArrow && (
          <div className="fixed right-6 bottom-4 z-10">
            <button onClick={handleClick} className=" rounded border-b-4 border-gray-400 bg-gray-200 py-2 px-[10px] font-bold shadow-lg hover:border-gray-500 hover:bg-gray-400">
              <TfiArrowUp className="text-black" />
            </button>
          </div>
        )}
        <ToastContainer position="bottom-left" hideProgressBar={false} limit={1} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        {!!data.length && <Ads />}
      </InfiniteScroll>
    </>
  );
};

export default withLanguage(BrowsingMemes);
