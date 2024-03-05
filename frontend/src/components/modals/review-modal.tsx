import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import StarRating from '../star-rating';
import { SubmitHandler, useForm } from 'react-hook-form';
import BasicButton from '../button/basic-button';
import { UserContext } from '../../context';
import { createReviews, editReview } from '../../api/reviews';
import toast from 'react-hot-toast';

interface IExistingData {
    comment: string;
    ratingStars: number;
    _id: string;
}
type Props = {
    isOpen: any;
    onClose: any;
    movieId: string;
    setReFetchReview?: Dispatch<SetStateAction<number>>;
    existingData?: IExistingData;
}

interface Inputs {
    comment: string;
}


const ReviewModal: FC<Props> = ({ isOpen, onClose, movieId, setReFetchReview, existingData }) => {

    console.log(existingData);
    const [stars, setStars] = useState<number>(existingData ? existingData?.ratingStars : 1);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
        defaultValues: {
            comment: existingData ? existingData?.comment : ""
        }
    });

    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    const { user } = useContext(UserContext);


    const onFormSubmit: SubmitHandler<Inputs> = async (data: any) => {
        let newDataObj = { comment: data.comment, ratingStars: stars }
        console.log("newDataObj", newDataObj);
        setSubmitLoading(true);
        let newReview;
        try {
            if (user) {
                if (existingData) newReview = await editReview(movieId, user?.token, existingData?._id, newDataObj,);
                else newReview = await createReviews(movieId, user?.token, newDataObj);
                if (newReview) {
                    if (setReFetchReview) setReFetchReview(prev => prev + 1);
                    setSubmitLoading(false);
                    toast.success("Review has been added!")
                    onClose();
                }
                else {
                    toast.error("There was unexpected error, try again!")
                    onClose();
                }
            }
            else {
                toast("Wont work! You need to login first!", { icon: "🙂" })
            }

        } catch (error) {
            setSubmitLoading(false);
            toast.error("There has been an error, try again!")
        }
        setSubmitLoading(false);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-backgroundBlack bg-opacity-50">
                    <div className="bg-[#292929] p-8 rounded shadow-md w-full max-w-md border-gray-600 border" >
                        <div className='w-full flex justify-end'>
                            <button
                                className=" text-primaryGreen hover:text-gray-800"
                                onClick={() => { onClose(); reset(); setStars(1); }}
                            >
                                <FontAwesomeIcon icon={faXmark} className='w-8 h-8' height={"40"} color='red' />
                            </button>
                        </div>
                        <h2 className="text-2xl font-bold mb-6 text-center">Add review</h2>

                        <div className='flex flex-col gap-4'>
                            <form onSubmit={handleSubmit(onFormSubmit)} className='flex flex-col gap-4' id='form'>
                                <div>
                                    <label
                                        htmlFor="Comment"
                                        className="mb-2 block text-[20px] font-medium text-white"
                                    >
                                        Comment
                                    </label>
                                    <input
                                        type="text"
                                        form='form'
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
                                        form='notinform'
                                        htmlFor="rating"
                                        className="mb-2 block text-[20px] font-medium text-white"
                                    >
                                        Rating
                                    </label>
                                    <StarRating initialRating={stars} onChange={(stars: number) => setStars(stars)} />

                                </div>

                                <BasicButton
                                    isLoading={submitLoading}
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

export default ReviewModal;
