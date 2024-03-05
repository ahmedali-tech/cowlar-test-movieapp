import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useState } from 'react';

type Iprops = {
    initialRating: number;
    onChange: any;
}
const StarRating: FC<Iprops> = ({ initialRating = 1, onChange }) => {
    const [rating, setRating] = useState(initialRating);

    const handleClick = (selectedRating: React.SetStateAction<number>) => {
        setRating(selectedRating);
        onChange(selectedRating);
    };

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <>
                    <button
                        key={star}
                        onClick={() => handleClick(star)}
                    >
                        <FontAwesomeIcon icon={faStar} color={star <= rating ? 'yellow' : 'gray'} className='text-3xl focus:outline-none focus:ring focus:border-blue-300' />
                    </button>
                </>
            ))}
        </div>
    );
};

export default StarRating;
