import { faPenToSquare, faUser } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'

interface IReviewProps {
    own?: boolean
}
const ReviewCard: FC<IReviewProps> = ({ own = false }) => {
    return (
        <>
            <article className="p-6 text-base bg-[#292929] rounded-lg dark:bg-gray-900 my-3">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-[#e7e7e7] dark:text-white font-semibold">
                            <div className='flex items-center'>
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="mr-2 w-6 h-6 rounded-full bg-[#f6f6f6] p-2"
                                    height={16}
                                    color='black'
                                /> Michael Gough
                            </div>
                        </p>
                        <p className="text-sm text-[#d1d1d1] dark:text-gray-400"><time dateTime="2022-02-08"
                            title="February 8th, 2022">Feb. 8, 2022</time></p>
                    </div>
                    {
                        own && (
                            <div className='flex justify-between gap-4'>
                                <FontAwesomeIcon icon={faPenToSquare} className='h-[20px] cursor-pointer' color='white' />
                                <FontAwesomeIcon icon={faTrash} className='h-[20px] cursor-pointer' color='red' />

                            </div>
                        )
                    }
                </footer>
                <p className="text-[#d1d1d1] dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, temporibus?</p>
            </article>
        </>
    )
}

export default ReviewCard