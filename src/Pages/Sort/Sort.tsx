import React, { useState, useRef } from 'react';
import { Form } from './Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RandomMeme } from './RandomMeme';
import { FadeLoader } from 'react-spinners';
import useFetch from '../../hooks/useFetch';
import { withLanguage } from '../../HOC/withLanguage';
import { useAuth } from '../../hooks/useAuth';
import Ads from '../../payments/Ads/AdsContainer';

const Sort = ({ texts }) => {
	const categorySelectRef = useRef();
	const typeSelectRef = useRef();
	const [isError, setIsError] = useState(false);
	const { auth } = useAuth();
	const [formErrors, setFormErrors] = useState({
		category: true,
		type: true,
		isNsfw: true,
		isUncropped: true,
		isMeme: true,
	});
	const [form, setForm] = useState({
		category: { id: '' },
		type: { id: '' },
		isNsfw: '',
		isUncropped: '',
		isMeme: '',
	});

	// formSubmited here as the second argument and useFetch custom hook gets a signal when the form is submitted fetches the data again
	const { data: meme, refetch, isLoading } = useFetch(`${import.meta.env.VITE_APP_API_BASE_URL}memes/memes/random`);

	const handleChange = event => {
		const fieldName = event.target.name;
		const fieldValue = event.target.value;
		setForm(prevForm => {
			if (fieldName === 'category' || fieldName === 'type') {
				return {
					...prevForm,
					[fieldName]: { id: fieldValue },
				};
			} else {
				return {
					...prevForm,
					[fieldName]: fieldValue === 'true',
				};
			}
		});
		setFormErrors({
			...formErrors,
			[fieldName]: !fieldValue,
		});
	};

	const handleSubmit = event => {
		event.preventDefault();
		fetch(`${import.meta.env.VITE_APP_API_BASE_URL}memes/memes/${meme.id}`, {
			method: 'PATCH',
			crossDomain: true,
			headers: {
				Authorization: `Bearer ${auth.token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(form),
		}).then(response => {
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
				isMeme: true,
			});
			setForm({
				category: { id: '' },
				type: { id: '' },
				isNsfw: '',
				isUncropped: '',
				isMeme: '',
			});
			refetch();
			categorySelectRef.current.value = 'Category';
			typeSelectRef.current.value = 'Type';
		});
	};

	return (
		<>
			{isLoading ? (
				<div className='flex flex-col items-center justify-center border border-gray-700 bg-gray-700 pt-2 shadow-md md:h-[86vh] md:flex-row md:pt-20'>
					<FadeLoader color='orange' />
				</div>
			) : (
				<main>
					<div className='flex flex-col items-center justify-center border border-gray-700 bg-gray-700 pt-2 shadow-md md:h-[86vh] md:flex-row md:pt-20'>
						<div className='flex w-full justify-center md:block md:w-auto md:pr-36 '>
							<Ads />
						</div>
						<RandomMeme texts={texts} randomMeme={meme} />
						<ToastContainer position='bottom-left' autoClose={2000} hideProgressBar={false} limit={1} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='dark' />
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
									handleChange,
								}}
							/>
						)}
						<div className='flex w-full justify-center md:block md:w-auto md:pl-16 '>
							<Ads />
						</div>
					</div>
				</main>
			)}
		</>
	);
};

export default withLanguage(Sort);
