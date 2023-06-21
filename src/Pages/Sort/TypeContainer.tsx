import { useMemo } from 'react';
import useFetch from '../../hooks/useFetch';
import { Type, TypeItem } from './Type';
import { SortProps } from './SortContainer';

export interface TypeProps extends SortProps {
  memoizedTypes?: TypeItem[];
}

const TypeContainer: React.FC<TypeProps> = ({ texts, handleChange, typeSelectRef }) => {
  const types = useFetch(`${process.env.VITE_APP_API_BASE_URL}memes/meme-types`).data?._embedded?.items;
  const memoizedTypes = useMemo(() => types, [types]);

  return <Type memoizedTypes={memoizedTypes} texts={texts} handleChange={handleChange} typeSelectRef={typeSelectRef} />;
};

export default TypeContainer;
