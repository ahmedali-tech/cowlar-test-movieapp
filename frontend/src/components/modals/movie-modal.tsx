import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useState } from 'react';
import StarRating from '../star-rating';
import { Controller, useForm } from 'react-hook-form';
import BasicButton from '../button/basic-button';

type Props = {
    isOpen: any;
    onClose: any;
}

enum MovieGenre {
    Horror = 'horror',
    Thriller = 'thriller',
    Comedy = 'comedy',
    Action = 'action',
    Drama = 'drama',
    ScienceFiction = 'fiction',
    Romance = 'romance',
    Mystery = 'mystery',
    Fantasy = 'fantasy',
    Adventure = 'adventure',
}


const MovieModal: FC<Props> = ({ isOpen, onClose }) => {

    const { register, control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-backgroundBlack bg-opacity-50">
                    <div className="bg-[#292929] p-8 rounded shadow-md w-full max-w-md border-gray-600 border" >
                        <div className='w-full flex justify-end'>
                            <button
                                className=" text-primaryGreen hover:text-gray-800"
                                onClick={onClose}
                            >
                                <FontAwesomeIcon icon={faXmark} className='w-8 h-8' height={"40"} color='red' />
                            </button>
                        </div>
                        <h2 className="text-2xl font-bold mb-6 text-center">Add Movie</h2>

                        <div className='flex flex-col gap-4'>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-[20px] font-medium text-white"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="block w-full rounded-lg border border-gray-300 text-white bg-[#292929] p-2.5 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                                        {...register('name', {
                                            required: 'name is required',
                                        })}
                                    />
                                    {errors.name && <span className="text-sm text-red-500">{errors.name.message?.toString()}</span>}

                                </div>
                                <div>
                                    <label
                                        htmlFor="release_year"
                                        className="mb-2 block text-[20px] font-medium text-white"
                                    >
                                        Release Year
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Release Year"
                                        className="block w-full rounded-lg border border-gray-300 text-white bg-[#292929] p-2.5 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                                        {...register('releaseYear', {
                                            required: 'Release Year is required',
                                            validate: {
                                                isNumeric: (value) => !isNaN(value) && Number.isInteger(+value) || 'Release Year must be a number',
                                                isValidYear: (value) => {
                                                    const year = parseInt(value, 10);
                                                    const currentYear = new Date().getFullYear();
                                                    return (year >= 1900 && year <= currentYear) || `Release Year must be between 1900 and ${currentYear}`;
                                                },
                                            },
                                        })}
                                    />
                                    {errors.releaseYear && <span className="text-sm text-red-500">{errors.releaseYear.message?.toString()}</span>}

                                </div>
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="mb-2 block text-[20px] font-medium text-white"
                                    >
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        className="block w-full rounded-lg border border-gray-300 text-white bg-[#292929] p-2.5 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                                        {...register('description', {
                                            required: 'Description is required',
                                        })}
                                    />
                                    {errors.description && <span className="text-sm text-red-500">{errors.description.message?.toString()}</span>}
                                </div>

                                <div className="relative">
                                    <label
                                        htmlFor="Genre"
                                        className="mb-2 block text-[20px] font-medium text-white"
                                    >
                                        Genre
                                    </label>
                                    <Controller
                                        name="genre"
                                        control={control}
                                        // defaultValue=""
                                        rules={{ required: 'Please select a genre' }}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                className="block appearance-none w-full bg-[#292929] border border-gray-300 text-white hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                                            >
                                                <option value="" selected={true} disabled>
                                                    Select
                                                </option>
                                                {Object.values(MovieGenre).map((option) => (
                                                    <option key={option} value={option}>
                                                        {`${option.charAt(0).toUpperCase() + option.slice(1)}`}
                                                    </option>
                                                ))}
                                            </select>

                                        )}
                                    />
                                    {errors.genre && (
                                        <p className="text-red-500 text-xs italic">{errors.genre.message?.toString()}</p>
                                    )}
                                    <div className="pointer-events-none absolute text-white top-[35px] inset-y-0 right-0 flex items-center px-2">
                                        <FontAwesomeIcon icon={faChevronDown} className='h-[17px]' color='white' />
                                    </div>
                                </div>
                                <span className="text-sm text-gray-200">Note: Dummy cover photo and movie links will be added automatically.</span>

                                <BasicButton
                                    isLoading={false}
                                    text="Submit"
                                    loadingText="Submitting ..."
                                    type='submit'
                                    className='w-min self-end'
                                />
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieModal;
