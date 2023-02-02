import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useFetch from '../../hooks/useFetch';
import { toast, ToastContainer } from 'react-toastify';
import photoError from '../../assets/error.png';
import { FadeLoader } from 'react-spinners';
import { TfiArrowUp } from 'react-icons/tfi';
import { withLanguage } from '../../components/HOC/withLanguage';

function BrowsingMemes({ texts }) {
  const [limit, setLimit] = useState(10);
  const [ratings, setRatings] = useState({});
  const [showArrow, setShowArrow] = useState(false);

  const loadMoreMemes = () => {
    setLimit(limit + 5);
  };

  const { data: memeFetching, isLoading } = useFetch(`${process.env.REACT_APP_API_BASE_URL}memes/memes?page=1&limit=${limit}`);
  const memeColections = memeFetching?._embedded?.items;
  console.log(memeColections?.length, isLoading);

  function handleVoice(memeId, isLike) {
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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showArrow]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <InfiniteScroll dataLength={memeColections?.length} hasMore={true} next={loadMoreMemes} scrollThreshold={0.8} loader={<FadeLoader className="mb-4 text-red-600" color="orange" />} className="flex flex-col items-center justify-center bg-gray-700 shadow-lg ">
      {memeColections?.map((meme) =>
        isLoading ? (
          <FadeLoader className="mb-4 text-red-600" color="orange" />
        ) : (
          <div key={meme.id}>
            <div className="m-2 rounded-lg bg-gray-400 shadow-lg">{meme.url.endsWith('.mp4') || meme.url.endsWith('.avi') ? <video className="min-w-0 mb-12 max-h-[70vh] min-h-0 max-w-[70vw] rounded-lg border-4 md:rounded" src={meme.url} alt="random meme video" controls></video> : <img loading="lazy" className="min-w-0 max-h-[70vh] min-h-0 max-w-[70vw] rounded-lg border-4 md:rounded" src={meme.url} alt="random meme" />}</div>
            <div className="mx-2 mb-8 flex">
              <button onClick={() => handleVoice(meme.id, true)} className="rounded border-b-4 border-green-800 bg-green-700 px-2 font-bold text-white shadow-lg hover:border-green-500 hover:bg-green-400">
                +
              </button>
              <button onClick={() => handleVoice(meme.id, false)} className="mx-1 rounded border-b-4 border-red-800 bg-red-700 px-[10px] font-bold text-white shadow-lg hover:border-red-500 hover:bg-red-400">
                -
              </button>
              <p className="rounded bg-black px-[10px] font-bold text-white"> {ratings[meme.id] || 0}</p>
            </div>
          </div>
        )
      )}
      {showArrow && (
        <div className="fixed right-6 bottom-4 z-10">
          <button onClick={handleClick} className=" rounded border-b-4 border-gray-400 bg-gray-200 py-2 px-[10px] font-bold shadow-lg hover:border-gray-500 hover:bg-gray-400">
            <TfiArrowUp className="text-black" />
          </button>
        </div>
      )}
      <ToastContainer position="bottom-left" hideProgressBar={false} limit={1} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </InfiniteScroll>
  );
}

export default withLanguage(BrowsingMemes);
