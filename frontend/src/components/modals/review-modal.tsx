import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useState } from 'react';
import StarRating from '../star-rating';
import { useForm } from 'react-hook-form';
import BasicButton from '../button/basic-button';

type Props = {
    isOpen: any;
    onClose: any;
}

const Modal: FC<Props> = ({ isOpen, onClose }) => {
    const [stars, setStars] = useState<number>(1);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        console.log(stars);
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
                        <h2 className="text-2xl font-bold mb-6 text-center">Add review</h2>

                        <div className='flex flex-col gap-4'>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                                <div>
                                    <label
                                        htmlFor="Comment"
                                        className="mb-2 block text-[20px] font-medium text-white"
                                    >
                                        Comment
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Comment"
                                        className="block w-full rounded-lg border border-gray-300 text-white bg-[#292929] p-2.5 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                                        {...register('comment', {
                                            required: 'Comment is required',
                                        })}
                                    />
                                    {errors.comment && <span className="text-sm text-red-500">{errors.comment.message?.toString()}</span>}

                                </div>
                                <div>
                                    <label
                                        htmlFor="rating"
                                        className="mb-2 block text-[20px] font-medium text-white"
                                    >
                                        Rating
                                    </label>
                                    <StarRating initialRating={stars} onChange={(stars: number) => setStars(stars)} />

                                </div>
                                {/* <button
                                type="submit"
                                className="bg-primaryGreen text-white my-5 py-2 px-4 rounded hover:bg-secondaryGreen w-min self-end"
                                // onClick={handleSubmit}
                            >
                                Submit
                            </button> */}
                                <BasicButton
                                    isLoading={false}
                                    text="Submit"
                                    loadingText="Submitting ..."
                                    type='submit'
                                    className='w-min self-end'
                                />
                            </form>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
