import caveman from '../assets/caveman-error.gif';
import { Link } from 'react-router-dom';
import { withLanguage } from './HOC/withLanguage';

function Missing({ texts }) {
  return (
    <div className="md:h-[83vh]">
      <img className="mx-auto my-auto h-[80%]" src={caveman} alt="a caveman lost, chewing a cable"></img>
      <h1 className="text:sm flex flex-col items-center justify-center md:flex-row md:text-2xl">
        {texts.missing}
        <br />
        <Link className=" flex  flex-col md:block md:flex-row" to="home">
          <button className="mx-2 rounded-lg bg-orange-600 p-2"> {texts.mainPage}</button>
          {texts.or}
        </Link>
        <Link to="sort">
          <button className="mx-2 rounded-lg bg-orange-600 p-2"> {texts.browse}</button>
        </Link>
      </h1>
    </div>
  );
}

export default withLanguage(Missing);
