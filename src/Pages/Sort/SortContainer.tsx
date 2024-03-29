import { useState, useRef, ChangeEvent, FormEvent, RefObject } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '../../hooks/useFetch';
import { withLanguage } from '../../HOC/withLanguage';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Sort from './Sort';
import { RootState } from '../../store/authSlice';

interface FormErrors {
  category: boolean;
  type: boolean;
  isNsfw: boolean;
  isUncropped: boolean;
  isMeme: boolean;
}

interface FormValues {
  category: { id: string };
  type: { id: string };
  isNsfw: string;
  isUncropped: string;
  isMeme: string;
  [key: string]: string | { id: string };
}

export interface TextsProps {
  texts: {
    notificationToastSuccesSortMeme?: string;
    notificationToastErrorSortMeme?: string;
    notificationToastWarn?: string;
    category?: string;
    type?: string;
    meme?: string;
    notMeme?: string;
    cropped?: string;
    unCropped?: string;
    sfw?: string;
    nsfw?: string;
    sort?: string;
  };
}
export interface SortProps extends TextsProps {
  isLoading?: boolean;
  meme?: {
    url: string | null;
  };
  form?: FormValues;
  formErrors?: FormErrors;
  categorySelectRef?: RefObject<HTMLSelectElement>;
  typeSelectRef?: RefObject<HTMLSelectElement>;
  setForm?: (form: FormValues) => void;
  setFormErrors?: (errors: FormErrors) => void;
  handleSubmit?: (event: FormEvent) => void;
  handleChange?: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
}

const SortContainer = ({ texts }: SortProps) => {
  const categorySelectRef = useRef<HTMLSelectElement>(null);
  const typeSelectRef = useRef<HTMLSelectElement>(null);

  const { token } = useSelector((state: RootState) => state.auth);
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
  const { data: meme, refetch, isLoading } = useFetch(`${process.env.VITE_APP_API_BASE_URL}memes/memes/random`);

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
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
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(`${process.env.VITE_APP_API_BASE_URL}memes/memes/${meme.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
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
      if (categorySelectRef.current) {
        categorySelectRef.current.value = 'Category';
      }

      if (typeSelectRef.current) {
        typeSelectRef.current.value = 'Type';
      }
    });
  };

  return <Sort {...{ texts, isLoading, meme, form, formErrors, categorySelectRef, typeSelectRef, handleSubmit, handleChange }} />;
};
export default withLanguage(SortContainer);
