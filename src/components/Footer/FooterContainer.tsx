import { faTwitter, faGithub, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FooterIcon } from './Footer';

export const FooterContainer = () => {
  return (
    <footer className="relative right-0 bottom-0 left-0 flex w-auto justify-center bg-gray-600 pt-2">
      <FooterIcon icon={faYoutube} reference={'https://youtube.com/'} txt={'Youtube'} value="hover:text-[#ff0000]" />
      <FooterIcon icon={faTwitter} reference={'https://twitter.com/'} txt={'Twitter'} value="hover:text-[#38bdf8]" />
      <FooterIcon icon={faGithub} reference={'https://github.com/Kamil-Drozdz/Project-Memes'} txt={'GitHub/repo'} value="hover:text-[#f0f6fc]" />
      <FooterIcon icon={faFacebook} reference={'https://facebook.com/'} txt={'Facebook'} value="hover:text-[#0b65c3]" />
    </footer>
  );
};
