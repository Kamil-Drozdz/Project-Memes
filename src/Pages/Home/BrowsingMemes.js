import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useFetch from '../../hooks/useFetch';
import { toast, ToastContainer } from 'react-toastify';
import photoError from '../../assets/error.png';
import { FadeLoader } from 'react-spinners';
import { TfiArrowUp } from 'react-icons/tfi';
import { BiCommentAdd } from 'react-icons/bi';
import { withLanguage } from '../../components/HOC/withLanguage';
import Comments from './Comments';
import { useAuth } from '../../hooks/useAuth';
import Ads from '../../payments/Ads';

function BrowsingMemes({ texts }) {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [ratings, setRatings] = useState({});
  const [showArrow, setShowArrow] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { data: memeFetching, isLoading } = useFetch(`${process.env.REACT_APP_API_BASE_URL}memes/memes?page=1&limit=${limit}`);
  const memeColections = memeFetching?._embedded?.items;
  const { auth } = useAuth();

  const loadMoreMemes = () => {
    setLimit(limit + 5);
  };

  //sets the state of the data to static, because when fetching with useFetch sometimes there is undefined data which will move to the top of the page, using state to store api data statically fixes the problem
  useEffect(() => {
    if (memeColections) {
      setData(memeColections);
    } else return;
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showArrow]);

  function handleVoice(memeId, isLike) {
    if (!auth.email) {
      toast.error(`${texts.logIn}`, { autoClose: 2000 });
      return;
    }
    if ((ratings[memeId] === 1 && isLike) || (ratings[memeId] === -1 && !isLike)) {
      toast.error(`${texts.notificationToastErrorAlreadyRated}`, { autoClose: 2000 });
      return;
    }
    setRatings((prevRatings) => ({
      ...prevRatings,
      [memeId]: isLike ? 1 : -1
    }));
    toast.success(isLike ? `${texts.notificationToastSuccesLike}` : `${texts.notificationToastSuccesDisLike}`, { autoClose: 1000 });
    //TODO tu request do API
  }
  const handleComments = (memeId) => {
    setShowComments(memeId);
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

  if (!data) {
    toast.warn(`${texts.notificationToastWarn}`, { autoClose: 5000 });

    return (
      <div className="flex items-center justify-center border border-gray-700 bg-gray-700 pt-20 shadow-md">
        <img className="m-8 max-h-full min-h-0 max-w-full rounded-t-lg border-4 md:rounded" src={photoError} alt="error" />
        <ToastContainer position="bottom-left" hideProgressBar={false} limit={1} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      </div>
    );
  }

  return (
    <>
      <InfiniteScroll dataLength={limit} hasMore={true} next={loadMoreMemes} scrollThreshold={0.8} className="flex min-h-[83vh] flex-col items-center justify-center bg-gray-700 shadow-lg scrollbar-none ">
        {!!data.length && (
          <div className="top-96 flex w-full items-center justify-center px-36 md:fixed md:justify-between ">
            <Ads />
            <div className="hidden md:block">
              <Ads />
            </div>
          </div>
        )}
        {data?.map((meme) => (
          <div className="w-full bg-black px-4 md:w-[40vw]" key={meme.id}>
            <div className="m-2 flex w-full items-center justify-center rounded-lg shadow-lg ">{meme.url.endsWith('.mp4') || meme.url.endsWith('.avi') ? <video className="mb-12 w-full rounded-lg border-4 object-contain md:rounded" src={meme.url} alt="random meme video" controls></video> : <img loading="lazy" className="mr-3 w-full rounded-lg border-4 object-contain md:rounded" src={meme.url} alt="random meme" />}</div>
            <div className="mx-2 mb-8 flex">
              <button onClick={() => handleVoice(meme.id, true)} className="rounded border-b-4 border-green-800 bg-green-700 px-2 font-bold text-white shadow-lg hover:border-green-500 hover:bg-green-400">
                +
              </button>
              <button onClick={() => handleVoice(meme.id, false)} className="mx-1 rounded border-b-4 border-red-800 bg-red-700 px-[10px] font-bold text-white shadow-lg hover:border-red-500 hover:bg-red-400">
                -
              </button>
              <p className="rounded bg-gray-700 px-[10px] font-bold text-white"> {ratings[meme.id] || 0}</p>
              <div className=" ml-1 rounded border-b-4 border-orange-800 bg-orange-700 px-2 font-bold text-black shadow-lg">
                <button onClick={() => handleComments(meme.id)}>
                  <BiCommentAdd className="mt-1" />
                </button>
              </div>
            </div>
            {showComments === meme.id && <Comments />}
          </div>
        ))}
        {showArrow && (
          <div className="fixed right-6 bottom-4 z-10">
            <button onClick={handleClick} className=" rounded border-b-4 border-gray-400 bg-gray-200 py-2 px-[10px] font-bold shadow-lg hover:border-gray-500 hover:bg-gray-400">
              <TfiArrowUp className="text-black" />
            </button>
          </div>
        )}
        {!!data.length && <Ads />}

        <ToastContainer position="bottom-left" hideProgressBar={false} limit={1} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      </InfiniteScroll>
    </>
  );
}

export default withLanguage(BrowsingMemes);
