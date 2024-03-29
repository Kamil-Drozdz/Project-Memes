import caveman from '../assets/caveman-error.gif';
import { Link } from 'react-router-dom';
import { withLanguage } from '../HOC/withLanguage';

interface MissingProps {
  texts: {
    missing: string;
    mainPage: string;
    or: string;
    sortMemes: string;
  };
}
const Missing = ({ texts }: MissingProps) => {
  return (
    <div className=" h-[92vh] md:h-[86vh]">
      <img className="mx-auto my-auto h-[50%] object-contain" src={caveman} alt="a caveman lost, chewing a cable"></img>
      <h2 className="text:sm flex flex-col items-center justify-center md:flex-row md:text-2xl">
        {texts.missing}
        <br />
        <Link className=" flex  flex-col md:block md:flex-row" to="/">
          <button className="mx-2 rounded-lg bg-orange-600 p-2 font-semibold"> {texts.mainPage}</button>
          {texts.or}
        </Link>
        <Link to="sort">
          <button className="mx-2 rounded-lg bg-orange-600 p-2 font-semibold"> {texts.sortMemes}</button>
        </Link>
      </h2>
    </div>
  );
};

export default withLanguage(Missing);
