import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { BiCommentAdd } from 'react-icons/bi';
import CommentsContainer from '../Home/Comments/CommentsContainer';
import useFetch from '../../hooks/useFetch';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';

const MemeInteraction = () => {
  let { id } = useParams();
  const { data: meme, isLoading } = useFetch(`${import.meta.env.VITE_APP_API_BASE_URL}memes/memes/${id}`);
  const { auth } = useAuth();
  const [showComments, setShowComments] = useState(false);
  console.log(meme);
  useEffect(() => {
    if (!isLoading && !meme) {
      toast.error('Nie można załadować mema', { autoClose: 2000 });
    }
  }, [isLoading, meme]);

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
    };
    try {
      await updateReaction(`${apiUrl}/${reaction}`);
      toast.success(isLike ? `${texts.notificationToastSuccesLike}` : `${texts.notificationToastSuccesDisLike}`, { autoClose: 500 });
    } catch (error) {
      await updateReaction(`${apiUrl}/reset`);
      toast.warn(`${texts.notificationToastReset}`, { autoClose: 500 });
    }
  };

  const handleComments = () => {
    setShowComments(!showComments);
  };

  if (isLoading)
    return (
      <div className="w-full h-full  md:min-h-[83vh] justify-center items-center flex flex-col">
        <FadeLoader color="#f97316" />
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="w-full flex justify-center items-center md:min-h-[83vh]">
      <div className="w-full bg-gray-900 p-4 md:w-[40vw]">
        <img className="mr-3 w-full rounded-lg border-4 object-contain md:rounded" src={meme?.url} alt="random meme" />
        <div className="m-2 mb-8 flex">
          <button onClick={() => handleVoice(true)} className="z-[2] mr-1 rounded border-b-4 border-green-800 bg-green-700 px-[8px] py-[6px] font-bold text-white shadow-lg hover:border-green-500 hover:bg-green-400">
            {meme?.userReaction?.id === 'like' ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
          </button>
          <p className="rounded bg-gray-600 border-b-4 mx-1 border-gray-700 min-w-[36px] text-center py-1 font-bold text-white">{(meme?.likeCount || 0) - (meme?.dislikeCount || 0)}</p>
          <button onClick={() => handleVoice(false)} className="z-[2] mx-1 w-fit rounded border-b-4 border-red-800 bg-red-700  px-[8px] py-[6px] font-bold text-white shadow-lg hover:border-red-500 hover:bg-red-400">
            {meme?.userReaction?.id === 'dislike' ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}
          </button>
          <button onClick={handleComments} className="z-[2] ml-1 rounded border-b-4 border-orange-800 bg-orange-700 hover:border-orange-500 hover:bg-orange-400 px-[10px] font-bold text-black shadow-lg">
            <BiCommentAdd size={20} />
          </button>
        </div>
        <CommentsContainer id={meme?.id} />
      </div>
    </div>
  );
};

export default MemeInteraction;
