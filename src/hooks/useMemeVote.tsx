import { Meme } from '../Pages/Home/BrowsingMemes/MemeLoaderContainer';
import { useAuth } from './useAuth';
import { toast } from 'react-toastify';

interface TextsProps {
  logIn: string;
  notificationToastSuccesLike: string;
  notificationToastSuccesDisLike: string;
  notificationToastReset: string;
}

interface MemeVoteProps {
  texts: TextsProps;
  updateMeme: (updatedMeme: Meme) => void;
}

export const useMemeVote = ({ texts, updateMeme }: MemeVoteProps) => {
  const { auth } = useAuth();

  const handleVoice = async (memeId: number, isLike: boolean) => {
    if (!auth.email) {
      toast.error(`${texts.logIn}`, { autoClose: 2000 });
      return;
    }
    const reaction = isLike ? 'like' : 'dislike';
    const apiUrl = `${process.env.VITE_APP_API_BASE_URL}memes/memes/${memeId}/reactions`;

    const updateReaction = async (url: string, method = 'POST') => {
      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${auth.token}` }
      });

      if (!response.ok) {
        throw new Error(`Błąd API: ${response.status}`);
      }

      const updatedMeme = await response.json();
      updateMeme(updatedMeme);
    };
    try {
      const updatedMeme = await updateReaction(`${apiUrl}/${reaction}`);
      toast.success(isLike ? `${texts.notificationToastSuccesLike}` : `${texts.notificationToastSuccesDisLike}`, { autoClose: 500 });
      return updatedMeme;
    } catch (error) {
      await updateReaction(`${apiUrl}/reset`);
      toast.warn(`${texts.notificationToastReset}`, { autoClose: 500 });
    }
  };

  return handleVoice;
};
