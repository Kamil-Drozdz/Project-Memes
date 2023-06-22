import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { TbCheck, TbShare3 } from 'react-icons/tb';
import CommentsContainer from '../Home/Comments/CommentsContainer';
import errorPhoto from '../../assets/error.png';
import { FadeLoader } from 'react-spinners';

interface MemeInteractionProps {
  texts: {
    searchMeme: string;
    memeIdNotFound: string;
  };
  meme?: {
    likeCount: number;
    dislikeCount: number;
    id?: number;
    url: string;
    userReaction: {
      id: string;
    };
  };
  handleCopy: () => void;
  isLoading: boolean;
  isCopy: boolean;
  handleVoice: (memeId: number, isLike: boolean) => void;
}

const MemeInteraction = ({ texts, meme, handleVoice, isCopy, handleCopy, isLoading }: MemeInteractionProps) => {
  if (isLoading)
    return (
      <div className="w-full h-full  md:min-h-[83vh] justify-center items-center flex flex-col">
        <FadeLoader color="#f97316" />
        <p>{texts.searchMeme}</p>
      </div>
    );
  return (
    <>
      {!meme?.id ? (
        <div className="flex justify-center items-center md:min-h-[83vh]">
          <div className="w-full bg-gray-900 px-4 pt-12 md:w-[40vw]">
            <img className="mr-3 w-full rounded-lg border-4 object-contain md:rounded" src={errorPhoto} alt="random meme" />
            <p className="text-white my-4">{texts.memeIdNotFound}</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center md:min-h-[83vh]">
          <div className="w-full bg-gray-900 p-4 md:w-[40vw]">
            <img className="mr-3 w-full rounded-lg border-4 object-contain md:rounded" src={meme?.url} alt="random meme" />
            <div className="m-2 mb-8 flex">
              <button
                onClick={() => {
                  if (meme?.id) handleVoice(meme.id, true);
                }}
                className="z-[2] mr-1 rounded border-b-4 border-green-800 bg-green-700 px-[8px] py-[6px] font-bold text-white shadow-lg hover:border-green-500 hover:bg-green-400"
              >
                {meme?.userReaction?.id === 'like' ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
              </button>
              <button
                onClick={() => {
                  if (meme?.id) handleVoice(meme.id, false);
                }}
                className="z-[2] mx-[1px] w-fit rounded border-b-4 border-red-800 bg-red-700  px-[8px] py-[6px] font-bold text-white shadow-lg hover:border-red-500 hover:bg-red-400"
              >
                {meme?.userReaction?.id === 'dislike' ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}
              </button>
              <p className="rounded bg-gray-600 border-b-4 mx-1 border-gray-700 min-w-[36px] text-center py-1 font-bold text-white">{(meme?.likeCount || 0) - (meme?.dislikeCount || 0)}</p>
              <button onClick={handleCopy} data-testid="copy-button" className="z-[2] ml-[1px] rounded border-b-4 border-orange-800 bg-orange-700 hover:border-orange-500 hover:bg-orange-400  px-[8px] font-bold text-black shadow-lg">
                {isCopy ? <TbCheck size={20} className="text-white" /> : <TbShare3 size={20} className="text-white" />}
              </button>
            </div>
            <CommentsContainer id={meme?.id} />
          </div>
        </div>
      )}
    </>
  );
};

export default MemeInteraction;
