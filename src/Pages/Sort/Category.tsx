import { useMemo } from 'react';
import useFetch from '../../hooks/useFetch';

export const Category = ({ handleChange, reference, texts }) => {
	const categories = useFetch(`${import.meta.env.VITE_APP_API_BASE_URL}memes/meme-categories`).data?._embedded?.items;
	const memoizedCategories = useMemo(() => categories, [categories]);

	return (
		<div className='mb-4'>
			<select name='category' ref={reference} className='mt-3 flex rounded-full bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400' onChange={handleChange} defaultValue='Category'>
				<option value='Category' disabled>
					{texts.category}
				</option>
				{memoizedCategories?.map((category, i) => (
					<option key={i} value={category.id}>
						{category.id.charAt(0).toUpperCase() + category.id.slice(1)}
					</option>
				))}
			</select>
		</div>
	);
};
