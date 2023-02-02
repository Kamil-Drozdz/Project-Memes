import { useMemo } from 'react';
import useFetch from '../../hooks/useFetch';

export const Category = ({ handleChange, reference, texts }) => {
  const { data } = useFetch(`${process.env.REACT_APP_API_BASE_URL}memes/meme-categories`);
  const categories = useMemo(() => data?._embedded?.items, [data]);

  return (
    <div className="mb-4">
      <select name="category" ref={reference} className="mt-3 flex rounded-full bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400" onChange={handleChange} defaultValue="Category">
        <option value="Category" disabled>
          {texts.category}
        </option>
        {categories?.map((category, i) => (
          <option key={i} value={category.id}>
            {category.id}
          </option>
        ))}
      </select>
    </div>
  );
};
