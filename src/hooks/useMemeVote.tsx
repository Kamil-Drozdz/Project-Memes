import { useAuth } from './useAuth';
import { toast } from 'react-toastify';

export const useMemeVote = (texts, updateMeme) => {
  const { auth } = useAuth();

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
