import { faPenToSquare, faUser } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, FC, SetStateAction, useContext } from 'react'
import StarRating from '../star-rating'
import { UserContext } from '../../context'
import { deleteReviews } from '../../api/reviews'
import toast from 'react-hot-toast'
interface IReviewBody {
    _id: string;
    movieId: string;
    comment: string;
    ratingStars: number;
    createdAt: string;
    updatedAt: string;
    userName: string;
}
interface IReviewProps {
    own?: boolean
    reviewBody: IReviewBody
    setReFetchReview?: Dispatch<SetStateAction<number>>;
    openModal?: () => void;
}

const ReviewCard: FC<IReviewProps> = ({ own = false, reviewBody, setReFetchReview, openModal }) => {

    const { user } = useContext(UserContext);

    const onDeleteButtonClick = async () => {
        // setSubmitLoading(true);
        try {
            if (user) {
                const deletionStatus = await deleteReviews(reviewBody.movieId, reviewBody._id, user?.token);
                if (deletionStatus) {
                    toast.success("Review deleted successfully!")
                    if (setReFetchReview) setReFetchReview((prev: number) => prev + 1);
                }
                else {
                    toast.error("There was unexpected error, try again!")
                }
            }
            else {
                toast("Wont work! You need to login first!", { icon: "🙂" })
            }

        } catch (error) {
            toast.error("There has been an error, try again!")
        }
    };

    return (
        <>
            <article className="p-6 text-base bg-[#292929] rounded-lg dark:bg-gray-900 my-3">
                <footer className="flex justify-between items-center mb-2 flex-wrap gap-3 sm:gap-0">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-[#e7e7e7] dark:text-white font-semibold">
                            <div className='flex items-center'>
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="mr-4 w-6 h-6 rounded-full bg-[#f6f6f6] p-2"
                                    height={16}
                                    color='black'
                                /> {reviewBody?.userName}
                            </div>
                        </p>
                        <p className="text-sm text-[#d1d1d1] dark:text-gray-400"><time dateTime="2022-02-08"
                            title={reviewBody?.createdAt}>{new Date(reviewBody?.createdAt).toLocaleString()}</time>
                        </p>

                    </div>
                    <div>
                        <StarRating initialRating={reviewBody?.ratingStars} changeAble={false} />
                    </div>
                    {
                        own && (
                            <div className='flex justify-between gap-4'>
                                <FontAwesomeIcon icon={faPenToSquare} onClick={openModal} className='h-[20px] cursor-pointer' color='white' />
                                <FontAwesomeIcon icon={faTrash} onClick={onDeleteButtonClick} className='h-[20px] cursor-pointer' color='red' />

                            </div>
                        )
                    }
                </footer>
                <p className="text-[#d1d1d1] dark:text-gray-400">{reviewBody?.comment}</p>
            </article>
        </>
    )
}

export default ReviewCard