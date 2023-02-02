import { useState, useEffect, useMemo } from 'react';
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

function BrowsingMemes({ texts }) {
  const [limit, setLimit] = useState(10);
  const [ratings, setRatings] = useState({});
  const [showArrow, setShowArrow] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { auth } = useAuth();

  const { data: memeColectionsFetch, isError, status, isLoading } = useFetch(`${process.env.REACT_APP_API_BASE_URL}memes/memes?page=1&limit=${limit}`);
  const memeColections = memeColectionsFetch?._embedded?.items;
  console.log(memeColections);

  const loadMoreMemes = () => {
    setLimit(limit + 5);
  };

  function handleVoice(memeId, isLike) {
    if (!auth.email) {
      toast.error(`${texts.logIn}`, { autoClose: 1000 });
      return;
    }

    setRatings((prevRatings) => ({
      ...prevRatings,
      [memeId]: isLike ? (prevRatings[memeId] || 0) + 1 : (prevRatings[memeId] || 0) - 1
    }));
    toast.success(isLike ? `${texts.notificationToastSuccesLike}` : `${texts.notificationToastSuccesDisLike}`, { autoClose: 1000 });
    //TODO tu request do API
  }

  const handleScroll = () => {
    if (window.pageYOffset > 50 && !showArrow) {
      setShowArrow(true);
    } else if (window.pageYOffset <= 50 && showArrow) {
      setShowArrow(false);
    }
  };

  const handleComments = (memeId) => {
    setShowComments(memeId);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showArrow]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const renderLoading = useMemo(() => {
    return isLoading ? <div>Loading...</div> : null;
  }, [isLoading]);

  if (!memeColections) {
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
      {renderLoading}
      <InfiniteScroll dataLength={memeColections.length} hasMore={true} next={loadMoreMemes} scrollThreshold={0.8} className="flex flex-col items-center justify-center bg-gray-700 shadow-lg scrollbar-none ">
        {memeColections?.map((meme) => (
          <div className="w-full bg-black px-4 md:w-[40vw]" key={meme.id}>
            <div className="m-2 flex w-full items-center justify-center rounded-lg shadow-lg ">{meme.url.endsWith('.mp4') || meme.url.endsWith('.avi') ? <video className="mb-12 max-h-[70vh] w-full rounded-lg border-4 object-contain md:rounded" src={meme.url} alt="random meme video" controls></video> : <img loading="lazy" className="mr-3  max-h-[70vh] w-full rounded-lg border-4 object-contain md:rounded" src={meme.url} alt="random meme" />}</div>
            <div className="mx-2 mb-8 flex">
              <button onClick={() => handleVoice(meme.id, true)} className="rounded border-b-4 border-green-800 bg-green-700 px-2 font-bold text-white shadow-lg hover:border-green-500 hover:bg-green-400">
                +
              </button>
              <button onClick={() => handleVoice(meme.id, false)} className="mx-1 rounded border-b-4 border-red-800 bg-red-700 px-[10px] font-bold text-white shadow-lg hover:border-red-500 hover:bg-red-400">
                -
              </button>
              <p className="rounded bg-gray-800 px-[10px] pt-1 font-bold text-white"> {ratings[meme.id] || 0}</p>
              <div className=" ml-1 h-8 rounded border-b-4 border-orange-800 bg-orange-700 px-2 font-bold text-black shadow-lg">
                <button onClick={() => handleComments(meme.id)}>
                  <BiCommentAdd className="mt-2" />
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
        <ToastContainer position="bottom-left" hideProgressBar={false} limit={1} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      </InfiniteScroll>
    </>
  );
}

export default withLanguage(BrowsingMemes);