import { useState, useRef, ChangeEvent, FormEvent, RefObject } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '../../hooks/useFetch';
import { withLanguage } from '../../HOC/withLanguage';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import Sort from './Sort';

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

interface AuthProps {
  auth: {
    token: string;
  };
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

  const { auth } = useAuth() as AuthProps;
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
  const { data: meme, refetch, isLoading } = useFetch(`${import.meta.env.VITE_APP_API_BASE_URL}memes/memes/random`);

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
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}memes/memes/${meme.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.token}`,
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

  return <Sort texts={texts} handleSubmit={handleSubmit} handleChange={handleChange} meme={meme} isLoading={isLoading} form={form} formErrors={formErrors} categorySelectRef={categorySelectRef} typeSelectRef={typeSelectRef} setForm={setForm} setFormErrors={setFormErrors} />;
};
export default withLanguage(SortContainer);
