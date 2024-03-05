import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Dispatch, FC, SetStateAction, useContext } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { deleteMovies, getOwnMovies } from '../../api/movies';
import { UserContext } from '../../context';

interface Props {
    name: string;
    releaseYear: string;
    imgUrl: string;
    id: string;
    setIsPageLoading: Dispatch<SetStateAction<boolean>>;
    setReFetch: Dispatch<SetStateAction<number>>;

}

const OwnMovieCard: FC<Props> = ({ name, releaseYear, imgUrl, id, setIsPageLoading, setReFetch }) => {

    const { isLoggedIn, user } = useContext(UserContext);

    const handleDeletion = () => {
        (async () => {
            try {
                setIsPageLoading(true);
                const { deleted } = await deleteMovies(id, user?.token || "") as any;
                setIsPageLoading(false);
                setReFetch(prev => prev + 1)
                toast.success('Movie deleted successfully!');
            } catch (error) {
                console.log('error', error);
                toast.error('There was an error fetching movies, try refreshing!', {
                    className: 'text-center',
                });
            }
        })();
    }

    return (
        <>
            <div className=' shadow-lg select-none border border-black/35 group hover:border hover:border-primaryGreen rounded-lg max-h-fit w-[230px] transition ease-in-out delay-100 hover:scale-105'>
                <div className='relative rounded-lg overflow-hidden'>
                    <img src={imgUrl} alt={name} className='aspect-[2/3] w-[100%] h-[345px]' />
                    <div className=' px-4 py-4 bg-black/40 none flex-col items-center justify-center gap-4 text-sm font-bold opacity-100 group-hover:opacity-100 duration-300 text-center flex max-h-full overflow-hidden'>
                        <h3 className='flex flex-col items-center justify-between gap-5'>
                            <Link to={`/movies/${id}`}>
                                <span className='text-sm font-medium md:block underline cursor-pointer'>
                                    {name}
                                </span>
                            </Link>
                            <span className=' text-sm font-medium md:block'>
                                {releaseYear}
                            </span>
                        </h3>
                        <div className='flex justify-between gap-4'>
                            <FontAwesomeIcon onClick={handleDeletion} icon={faTrash} className='h-[20px] cursor-pointer' color='red' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OwnMovieCard