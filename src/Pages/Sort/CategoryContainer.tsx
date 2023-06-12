import { useMemo } from 'react';
import useFetch from '../../hooks/useFetch';
import { SortProps } from './SortContainer';
import { Category, CategoryItem } from './Category';

export interface CategoryProps extends SortProps {
  memoizedCategories?: CategoryItem[];
}

export const CategoryContainer = ({ handleChange, categorySelectRef, texts }: CategoryProps) => {
  const categories = useFetch(`${import.meta.env.VITE_APP_API_BASE_URL}memes/meme-categories`).data?._embedded?.items;
  const memoizedCategories = useMemo(() => categories, [categories]);

  return <Category {...{ categorySelectRef, texts, memoizedCategories, handleChange }} />;
};

export default CategoryContainer;
