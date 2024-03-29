import unauthorizedPhoto from '../assets/unauthorized-error.png';
import { Link } from 'react-router-dom';
import { withLanguage } from '../HOC/withLanguage';

interface UnauthorizedProps {
  texts: {
    unauthorized: string;
    logIn: string;
  };
}
const Unauthorized = ({ texts }: UnauthorizedProps) => {
  return (
    <div className=" h-[92vh] md:h-[86vh]">
      <img className="mx-auto my-auto h-[50%] object-contain" src={unauthorizedPhoto} alt="named you shall not pass"></img>
      <h2 className="text:sm flex flex-col items-center justify-center text-gray-300 md:text-2xl">
        {texts.unauthorized}
        <Link to="/login">
          <button className="e mx-2 mt-4 rounded-lg bg-orange-600 p-2 font-semibold text-black">{texts.logIn}</button>
        </Link>
      </h2>
    </div>
  );
};

export default withLanguage(Unauthorized);
