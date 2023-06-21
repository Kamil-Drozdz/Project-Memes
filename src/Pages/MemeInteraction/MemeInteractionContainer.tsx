import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { toast } from 'react-toastify';
import { useMemeVote } from '../../hooks/useMemeVote';
import { withLanguage } from '../../HOC/withLanguage';
import MemeInteraction from './MemeInteraction';
import { Meme } from '../Home/BrowsingMemes/MemeLoaderContainer';

interface TextsProps {
  linkCopied: string;
  linkCopiedError: string;
  searchMeme: string;
  memeIdNotFound: string;
  logIn: string;
  notificationToastSuccesLike: string;
  notificationToastSuccesDisLike: string;
  notificationToastReset: string;
}

function MemeInteractionContainer({ texts }: { texts: TextsProps }) {
  let { id } = useParams();
  const [meme, setMeme] = useState<Meme>();
  const [isCopy, SetIsCopy] = useState(false);
  const { data: fetchedMeme, isLoading } = useFetch(`${process.env.VITE_APP_API_BASE_URL}memes/memes/${id}`);

  const handleVoice = useMemeVote({
    texts,
    updateMeme: (updatedMeme: Meme) => {
      setMeme(updatedMeme);
    }
  });

  const handleCopy = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success(`${texts.linkCopied}`, { autoClose: 1000 });
        SetIsCopy(true);
        setTimeout(() => {
          SetIsCopy(false);
        }, 5000);
      })
      .catch(() => {
        toast.success(`${texts.linkCopiedError}`, { autoClose: 1000 });
      });
  };

  useEffect(() => {
    if (fetchedMeme) {
      setMeme(fetchedMeme);
    }
  }, [fetchedMeme]);

  useEffect(() => {
    if (!isLoading && meme === null) {
      toast.error('Nie można załadować mema', { autoClose: 2000 });
    }
  }, [isLoading, meme]);

  return <MemeInteraction {...{ texts, meme, handleVoice, isCopy, handleCopy, isLoading }} />;
}

export default withLanguage(MemeInteractionContainer);
