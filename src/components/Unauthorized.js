import unauthorizedPhoto from '../assets/unauthorized-error.png';
import { Link } from 'react-router-dom';
import { withLanguage } from './HOC/withLanguage';

function Unauthorized({ texts }) {
  return (
    <div className="h-[83vh]">
    <img className="mx-auto my-auto h-[50%] object-contain" src={unauthorizedPhoto} alt="named you shall not pass"></img>
      <h1 className="text:sm flex flex-col items-center justify-center md:text-2xl">
        {texts.unauthorized}
        <Link to="/login">
          <button className="mx-2 mt-4 rounded-lg bg-orange-600 p-2">{texts.logIn}</button>
        </Link>
      </h1>
    </div>
  );
}

export default withLanguage(Unauthorized);
