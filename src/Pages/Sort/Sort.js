import React, { useState, useRef } from 'react';
import { Form } from './Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RandomMeme } from './RandomMeme';
import { PacmanLoader } from 'react-spinners';
import useFetch from '../../hooks/useFetch';
import { withLanguage } from '../../components/HOC/withLanguage';
import { useAuth } from '../../hooks/useAuth';

function Sort({ texts }) {
  const categorySelectRef = useRef();
  const typeSelectRef = useRef();
  const [isError, setIsError] = useState(false);
  const { auth } = useAuth();
  const [formErrors, setFormErrors] = useState({
    category: true,
    type: true,
    isNsfw: true,
    isUncropped: true,
    isMeme: true
  });
  const [form, setForm] = useState({
    category: { id: '' },
    type: { id: '' },
    isNsfw: '',
    isUncropped: '',
    isMeme: ''
  });

  // formSubmited here as the second argument and useFetch custom hook gets a signal when the form is submitted fetches the data again
  const { data: meme, refetch, isLoading } = useFetch(`${process.env.REACT_APP_API_BASE_URL}memes/memes/random`);

  function handleChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setForm((prevForm) => {
      if (fieldName === 'category' || fieldName === 'type') {
        return {
          ...prevForm,
          [fieldName]: { id: fieldValue }
        };
      } else {
        return {
          ...prevForm,
          [fieldName]: fieldValue === 'true'
        };
      }
    });
    setFormErrors({
      ...formErrors,
      [fieldName]: !fieldValue
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}memes/memes/${meme.id}`, {
      method: 'PATCH',
      crossDomain: true,
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        method: 'PATCH'
      },
      body: JSON.stringify(form)
    }).then((response) => {
      if (response.status === 200) {
        toast.success(`${texts.notificationToastSuccesSortMeme}`);
      } else {
        toast.error(`${texts.notificationToastErrorSortMeme}`);
      }
      setFormErrors({
        category: true,
        type: true,
        isNsfw: true,
        isUncropped: true,
        isMeme: true
      });
      setForm({
        category: { id: '' },
        type: { id: '' },
        isNsfw: '',
        isUncropped: '',
        isMeme: ''
      });
      refetch();
      categorySelectRef.current.value = 'Category';
      typeSelectRef.current.value = 'Type';
    });
  }

  return (
    <main>
      <div className="flex  h-[91vh] flex-col items-center justify-center border border-gray-700 bg-gray-700 pt-2 shadow-md md:h-[83vh] md:flex-row md:pt-20">
        {isLoading ? <PacmanLoader color="orange" /> : <RandomMeme texts={texts} randomMeme={meme} />}
        <ToastContainer position="bottom-left" autoClose={2000} hideProgressBar={false} limit={1} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        {isError || (
          <Form
            props={{
              texts,
              form,
              formErrors,
              categorySelectRef,
              typeSelectRef,
              setForm,
              setFormErrors,
              handleSubmit,
              handleChange
            }}
          />
        )}
      </div>
    </main>
  );
}

export default withLanguage(Sort);
