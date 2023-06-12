import { FadeLoader } from 'react-spinners';
import Ads from '../../payments/Ads/AdsContainer';
import { RandomMeme } from './RandomMeme';
import { Form } from './Form';
import { ToastContainer } from 'react-toastify';
import { SortProps } from './SortContainer';

const Sort = ({ texts, isLoading, meme, form, formErrors, categorySelectRef, typeSelectRef, handleSubmit, handleChange }: SortProps) => {
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center border border-gray-700 bg-gray-700 pt-2 shadow-md md:h-[86vh] md:flex-row md:pt-20">
          <FadeLoader color="orange" />
        </div>
      ) : (
        <main>
          <div className="flex flex-col items-center justify-center border border-gray-700 bg-gray-700 pt-2 shadow-md md:h-[86vh] md:flex-row md:pt-20">
            <div className="flex w-full justify-center md:block md:w-auto md:pr-36 ">
              <Ads />
            </div>
            <RandomMeme texts={texts} randomMeme={meme} />
            <ToastContainer position="bottom-left" autoClose={2000} hideProgressBar={false} limit={1} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <Form {...{ texts, form, formErrors, handleSubmit, categorySelectRef, typeSelectRef, handleChange }} />

            <div className="flex w-full justify-center md:block md:w-auto md:pl-16 ">
              <Ads />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Sort;
