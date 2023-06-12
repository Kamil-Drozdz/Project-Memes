import { ChangeEvent, RefObject, useMemo } from 'react';
import useFetch from '../../hooks/useFetch';
import { Type, TypeItem } from './Type';

interface TypeProps {
  handleChange?: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;

  typeSelectRef: RefObject<HTMLSelectElement>;
  texts: {
    type: string;
  };
  memoizedTypes: TypeItem[];
}

const TypeContainer: React.FC<TypeProps> = ({ texts, handleChange, typeSelectRef }) => {
  const types = useFetch(`${import.meta.env.VITE_APP_API_BASE_URL}memes/meme-types`).data?._embedded?.items;
  const memoizedTypes = useMemo(() => types, [types]);

  return <Type memoizedTypes={memoizedTypes} texts={texts} handleChange={handleChange} typeSelectRef={typeSelectRef} />;
};

export default TypeContainer;
