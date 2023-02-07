import photoError from '../../assets/error.png';
import { toast } from 'react-toastify';

export function RandomMeme({ randomMeme, texts }) {
  try {
    if (randomMeme?.url.endsWith('.mp4') || randomMeme?.url.endsWith('.avi')) {
      return <video className=" min-w-0 2 max-h-[70vh] min-h-0 rounded-t-lg border-4     md:max-w-[70vw] md:rounded" src={randomMeme?.url} alt="random meme video" controls></video>;
    } else {
      return <img className=" min-w-0 max-h-[70vh] min-h-0 rounded-t-lg border-4 md:max-w-[70vw] md:rounded" src={randomMeme?.url} alt="random meme" />;
    }
  } catch (error) {
    toast.warn(`${texts.notificationToastWarn}`, { autoClose: 5000 });

    return <img className="m-8 max-h-full min-h-0 max-w-full rounded-t-lg border-4 md:rounded" src={photoError} alt="error" />;
  }
}
