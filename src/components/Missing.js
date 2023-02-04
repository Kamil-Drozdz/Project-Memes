import caveman from '../assets/caveman-error.gif';
import { Link } from 'react-router-dom';
import { withLanguage } from './HOC/withLanguage';

function Missing({ texts }) {
  return (
    <div className="h-[83vh]">
      <img className="mx-auto my-auto h-[80%]" src={caveman} alt="a caveman lost, chewing a cable"></img>
      <h1 className="text:sm flex items-center justify-center md:text-2xl">
        {texts.missing}
        <br />
        <Link to="home">
          <button className="rounded-lg bg-orange-600 md:mx-2 md:p-2"> {texts.mainPage}</button>
          {texts.or}
        </Link>
        <Link to="sort">
          <button className="rounded-lg bg-orange-600 md:mx-2 md:p-2"> {texts.browse}</button>
        </Link>
      </h1>
    </div>
  );
}

export default withLanguage(Missing);
