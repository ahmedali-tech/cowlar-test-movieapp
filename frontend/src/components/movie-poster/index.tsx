import { FC } from 'react';
import {
    faCalendar,
    faClock,
    faClosedCaptioning,
    faFilm,
    faGlobe,
    faShareNodes,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';

interface IMoviePoster {
    imgUrl: string;
    description: string;
    name: string;
    genre: string;
    releaseYear: string;
    videoUrl: string;
}
const MoviePoster: FC<IMoviePoster> = ({ imgUrl, description, name, genre, releaseYear, videoUrl }) => {

    const handleCopyClick = () => {
        const currentUrl = `${window.location.origin}${location.pathname}${location.search}`;
        navigator.clipboard
            .writeText(currentUrl)
            .then(() => {
                toast('Link copied to clipboard :)', { icon: '📋' });
            })
            .catch(() => {
                toast.error("Sorry! Coundn't copy link :(");
            });
    };

    return (
        <>
            <div
                style={{ backgroundImage: `url(${imgUrl})` }}
                className='bg-cover w-full aspect-video relative bg-center lg:max-h-[800px]'
            >
                <div className='inset-0 bg-black/90 px-4 pb-10 pt-24 flex items-center lg:absolute'>
                    <div className='w-full max-w-7xl mx-auto flex flex-col items-center gap-12 md:flex-row'>
                        <img
                            src={imgUrl}
                            alt={'Inglorious Bastards'}
                            className='aspect-[2/3] rounded w-full max-w-[300px]'
                        />
                        <div className='w-full'>
                            <h2 className='text-4xl font-extrabold lg:text-5xl'>
                                {`${name.charAt(0).toUpperCase() + name.slice(1)}`}
                            </h2>
                            <div className='font-medium flex flex-col gap-5 my-4 lg:flex-row lg:items-center'>
                                <div className='flex items-center gap-2 text-xs font-bold'>
                                    <span className='bg-primaryGreen px-2.5 py-1 text-black'>
                                        Full
                                    </span>
                                    <span className='border-2 border-primaryGreen px-2.5 py-0.5'>
                                        HD
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center gap-5'>
                                <span className='flex items-center gap-2'>
                                    <FontAwesomeIcon icon={faCalendar} height={16} color='red' />
                                    {releaseYear}
                                </span>
                                <span className='flex items-center gap-2'>
                                    <FontAwesomeIcon icon={faClock} height={16} color='red' />
                                    {'1h 22m'}
                                </span>
                                <span className='flex items-center gap-2'>
                                    <FontAwesomeIcon
                                        icon={faClosedCaptioning}
                                        height={16}
                                        color='red'
                                    />

                                    {'English'}
                                </span>
                            </div>
                            <div className='flex items-center gap-5'>
                                <span className='flex items-center gap-2'>
                                    <FontAwesomeIcon icon={faFilm} height={16} color='red' />
                                    {`${genre.charAt(0).toUpperCase() + genre.slice(1)}`}
                                </span>
                                <div className='flex items-center gap-2 my-2'>
                                    <FontAwesomeIcon icon={faGlobe} height={16} color='red' />
                                    Hollywood
                                </div>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `${description.charAt(0).toUpperCase() + description.slice(1)
                                        }`,
                                }}
                                className='text-sm'
                            />
                            <div className='border border-white/5 bg-white/5 px-4 py-4 flex items-center w-max rounded-lg mt-8 gap-1.5 md:gap-5 md:px-7'>
                                <button
                                    onClick={handleCopyClick}
                                    className='flex-col justify-center items-center gap-1 text-sm flex hover:text-primary'
                                >
                                    <FontAwesomeIcon
                                        icon={faShareNodes}
                                        className='h-5'
                                        height={20}
                                        color='red'
                                    />
                                    Share
                                </button>
                                <span className='h-12 w-0.5 bg-white/10 md:block' />
                                <div className='flex items-center gap-3 text-sm font-bold'>
                                <a href={videoUrl} target='_blank' className='cursor-pointer'>
                                        <button className='cursor-pointer rounded-full bg-primaryRed text-white px-8 py-3 disabled:bg-zinc-600 disabled:hover:bg-zinc-600 disabled:text-white'>
                                            <FontAwesomeIcon
                                                icon={faVideo}
                                                className='h-4 mr-1'
                                                height={16}
                                                color='white'
                                            />
                                            Trailer
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MoviePoster;
