import { FadeLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import Ads from '../../../payments/Ads/AdsContainer';
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { BiCommentAdd } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';
import SkeletonLoader from '../../../components/SkeletonLoader';
import photoError from '/@/assets/error.png';
import { TfiArrowUp } from 'react-icons/tfi';
import { Meme } from './MemeLoaderContainer';
import CommentsContainer from '../Comments/CommentsContainer';
import { TbCheck, TbShare3 } from 'react-icons/tb';

interface InfiniteScrollProps {
  data: Meme[];
  loadMoreMemes: () => void;
  isLoaded: boolean[];
  showError: boolean;
  handleImageLoaded: (index: number) => void;
  showComments: number | null;
  showArrow: boolean;
  handleClick: () => void;
  handleCopy: (Id: number) => void;
  copiedMemeId: number | null;
  handleVoice: (memeId: number, isLike: boolean) => void;
  handleComments: (memeId: number) => void;
  handleMemeClick: (Id: number) => void;
}

const InfiniteScrollComponent = ({ data, loadMoreMemes, handleCopy, copiedMemeId, isLoaded, handleMemeClick, showError, handleImageLoaded, showComments, showArrow, handleClick, handleVoice, handleComments }: InfiniteScrollProps): React.ReactElement => {
  return showError ? (
    <div className="flex items-center justify-center border border-gray-700 bg-gray-700 pt-20 shadow-md">
      <img className="m-8 max-h-full min-h-0 max-w-full rounded-t-lg border-4 md:rounded" src={photoError} alt="error" />
      <ToastContainer position="bottom-left" hideProgressBar={false} limit={1} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  ) : (
    <InfiniteScroll dataLength={data?.length} loader={<FadeLoader className="my-6 h-full w-full text-red-600 " color="orange" />} hasMore={true} next={loadMoreMemes} scrollThreshold={0.8} className="flex min-h-[83vh] flex-col items-center justify-center bg-gray-700 shadow-lg ">
      {!!data.length && (
        <div className="md:top-[10%] mt-12 mb-4  relative -z-0 md:flex w-full items-center justify-center px-0  xs:px-10 xl:px-20  2xl:px-36 md:fixed md:justify-between ">
          <Ads />
          <div className="hidden md:block my-8 ">
            <Ads />
          </div>
        </div>
      )}
      {data?.map((meme, index: number) => (
        <div className="w-full bg-gray-800 px-4 md:w-[40vw] z-[3]" key={index}>
          {!isLoaded[index] && <SkeletonLoader />}
          <div className={`${isLoaded[index] ? 'block' : 'hidden'}`}>
            <div onClick={() => meme.id && handleMemeClick(meme.id)} className="m-2 flex cursor-pointer z-[5] w-full items-center justify-center rounded-lg shadow-lg">
              {meme.url.endsWith('.mp4') || meme.url.endsWith('.avi') ? <video className="mb-12 w-full rounded-lg border-4 object-contain md:rounded" onLoad={() => handleImageLoaded(index)} src={meme.url} aria-label="random meme video" controls /> : <img onLoad={() => handleImageLoaded(index)} className="mr-3 w-full rounded-lg border-4 object-contain md:rounded" src={meme.url} alt="random meme" />}
            </div>
            <div className="mx-2 mb-8 flex">
              <button
                onClick={() => {
                  if (meme.id !== undefined) {
                    handleVoice(meme.id, true);
                  }
                }}
                className=" rounded border-b-4 border-green-800 bg-green-700 px-[8px] py-[6px] font-bold text-white shadow-lg hover:border-green-500 hover:bg-green-400"
              >
                {meme?.userReaction?.id === 'like' ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
              </button>
              <button
                onClick={() => {
                  if (meme.id !== undefined) {
                    handleVoice(meme.id, false);
                  }
                }}
                className=" mx-1 w-fit rounded border-b-4 border-red-800 bg-red-700  px-[8px] py-[6px] font-bold text-white shadow-lg hover:border-red-500 hover:bg-red-400"
              >
                {meme?.userReaction?.id === 'dislike' ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}
              </button>
              <p className="rounded bg-gray-600 border-b-4 border-gray-700 min-w-[36px] text-center py-1 font-bold text-white">{(meme.likeCount || 0) - (meme.dislikeCount || 0)}</p>
              <button
                data-testid="copy-button"
                onClick={() => {
                  if (meme.id !== undefined) {
                    handleCopy(meme.id);
                  }
                }}
                className="z-[2] ml-1 rounded border-b-4 border-orange-800 bg-orange-700 hover:border-orange-500 hover:bg-orange-400 px-[8px] font-bold text-black shadow-lg"
              >
                {copiedMemeId === meme.id ? <TbCheck size={20} className="text-white" /> : <TbShare3 size={20} className="text-white" />}
              </button>
              <button
                className="ml-1 rounded border-b-4 border-orange-800 bg-orange-700 hover:border-orange-500 hover:bg-orange-400 px-[8px] font-bold text-black shadow-lg"
                onClick={() => {
                  if (meme.id !== undefined) {
                    handleComments(meme.id);
                  }
                }}
              >
                <BiCommentAdd className="text-white" size={20} />
              </button>
            </div>
          </div>
          {showComments === meme.id && <CommentsContainer id={meme.id} />}
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
      {!!data.length && (
        <div className="my-4 w-full md:w-auto md:h-auto h-full">
          <Ads />
        </div>
      )}
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
