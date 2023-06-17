import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { TbShare3 } from 'react-icons/tb';
import CommentsContainer from '../Home/Comments/CommentsContainer';
import useFetch from '../../hooks/useFetch';
import errorPhoto from '../../assets/error.png';
import { toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';
import { useMemeVote } from '../../hooks/useMemeVote';
import { withLanguage } from '../../HOC/withLanguage';

const MemeInteraction = ({ texts }) => {
  let { id } = useParams();
  const [meme, setMeme] = useState([]);
  const { data: fetchedMeme, isLoading } = useFetch(`${import.meta.env.VITE_APP_API_BASE_URL}memes/memes/${id}`);

  const handleVoice = useMemeVote(texts, (updatedMeme) => {
    setMeme(updatedMeme);
  });

  useEffect(() => {
    if (fetchedMeme) {
      setMeme(fetchedMeme);
    }
  }, [fetchedMeme]);

  useEffect(() => {
    if (!isLoading && !meme) {
      toast.error('Nie można załadować mema', { autoClose: 2000 });
    }
  }, [isLoading, meme]);

  if (meme.length)
    return (
      <div className="flex justify-center items-center md:min-h-[83vh]">
        <div className="w-full bg-gray-900 px-4 pt-12 md:w-[40vw]">
          <img className="mr-3 w-full rounded-lg border-4 object-contain md:rounded" src={errorPhoto} alt="random meme" />
          <p className="text-white my-4">Wybacz nie możemy znaleść tego mema o podanym ID w bazie danych spróbuj innego </p>
        </div>
      </div>
    );
  if (isLoading)
    return (
      <div className="w-full h-full  md:min-h-[83vh] justify-center items-center flex flex-col">
        <FadeLoader color="#f97316" />
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center md:min-h-[83vh]">
      <div className="w-full bg-gray-900 p-4 md:w-[40vw]">
        <img className="mr-3 w-full rounded-lg border-4 object-contain md:rounded" src={meme?.url} alt="random meme" />
        <div className="m-2 mb-8 flex">
          <button onClick={() => handleVoice(meme?.id, true)} className="z-[2] mr-1 rounded border-b-4 border-green-800 bg-green-700 px-[8px] py-[6px] font-bold text-white shadow-lg hover:border-green-500 hover:bg-green-400">
            {meme?.userReaction?.id === 'like' ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
          </button>
          <button onClick={() => handleVoice(meme?.id, false)} className="z-[2] mx-1 w-fit rounded border-b-4 border-red-800 bg-red-700  px-[8px] py-[6px] font-bold text-white shadow-lg hover:border-red-500 hover:bg-red-400">
            {meme?.userReaction?.id === 'dislike' ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}
          </button>
          <p className="rounded bg-gray-600 border-b-4 mx-1 border-gray-700 min-w-[36px] text-center py-1 font-bold text-white">{(meme?.likeCount || 0) - (meme?.dislikeCount || 0)}</p>
          <button className="z-[2] ml-1 rounded border-b-4 border-orange-800 bg-orange-700 hover:border-orange-500 hover:bg-orange-400 px-[10px] font-bold text-black shadow-lg">
            <TbShare3 size={20} className="text-white" />
          </button>
        </div>
        <CommentsContainer id={meme?.id} />
      </div>
    </div>
  );
};

export default withLanguage(MemeInteraction);
