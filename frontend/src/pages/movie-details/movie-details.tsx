import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { UserContext } from '../../context';

import RootLayout from '../../Layout/RootLayout';
import ContainerLayout from '../../Layout/ContainerLayout';

import useAuthVerification from '../../hooks/useAuthentication';

import { getMovie } from '../../api/movies';
import { getReviews } from '../../api/reviews';

import Loading from '../../components/loading';
import ReviewModal from '../../components/modals/review-modal';
import ReviewCard from '../../components/review-card';
import MoviePoster from '../../components/movie-poster';

interface Movie {
    _id: string;
    name: string;
    releaseYear: string;
    description: string;
    imgUrl: string;
    videoUrl: string;
    genre: string;
}

const dummyMovie: Movie = {
    _id: '',
    name: '',
    releaseYear: '',
    description: '',
    imgUrl: '',
    videoUrl: '',
    genre: '',
};

function MovieDetails() {
    const { id } = useParams();
    const { pageLoading: pageLoadingFromVerificationHook } =
        useAuthVerification();

    const { isLoggedIn, user } = useContext(UserContext);

    const [movie, setMovie] = React.useState<Movie>(dummyMovie);
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [isPageLoading, setIsPageLoading] = React.useState<boolean>(false);
    const [ownReviews, setOwnReview] = React.useState([]);
    const [allReviews, setAllReviews] = React.useState([]);
    const [reFetchReview, setReFetchReview] = React.useState(1);

    console.log(reFetchReview);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleWriteReviewClick = () => {
        if (isLoggedIn) {
            if (ownReviews.length === 0) {
                openModal();
            } else {
                // User already has a review
                toast('Wont work! You have already reviewed.', { icon: '🙂' });
            }
        } else {
            // User needs to log in
            toast('Wont work! You need to login first!', { icon: '🙂' });
        }
    };

    React.useEffect(() => {
        (async () => {
            try {
                setIsPageLoading(true);
                const { data } = (await getMovie(id || '')) as any;
                const { ownReview, allReviews } = (await getReviews(
                    id || '',
                    user?.token || ''
                )) as any;
                setOwnReview(ownReview);
                setAllReviews(allReviews);
                setMovie(data);
                setIsPageLoading(false);
            } catch (error) {
                console.log('error', error);
                toast.error('There was an error fetching data, try refreshing!', {
                    className: 'text-center',
                });
            }
        })();
    }, [user?.token, reFetchReview]);

    if (isPageLoading) {
        return (
            <>
                <Toaster />
                <RootLayout>
                    <div className='w-screen h-screen flex items-center justify-center'>
                        <Loading />
                        <p className='mx-2'>Loading ...</p>
                    </div>
                </RootLayout>
            </>
        );
    }

    if (pageLoadingFromVerificationHook) {
        return (
            <>
                <Toaster />
                <RootLayout>
                    <div className='w-screen h-screen flex items-center justify-center'>
                        <Loading />
                        <p className='mx-2'>Loading ...</p>
                    </div>
                </RootLayout>
            </>
        );
    }

    return (
        <>
            <RootLayout>
                <MoviePoster
                    imgUrl={movie.imgUrl}
                    description={movie.description}
                    name={movie.name}
                    genre={movie.genre}
                    releaseYear={movie.releaseYear}
                    videoUrl={movie.videoUrl}
                />

                <ContainerLayout>
                    <div className='mx-auto max-w-7xl flex flex-col mb-28'>
                        <div className='text-sm px-5'>
                            <ul key={'server.server_name'}>
                                <p className='text-[24px] font-bold mb-4 mt-8'>Watch Online</p>
                                <li
                                    className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-12 text-center gap-2'
                                    key={'server.server_name'}
                                >
                                    <button
                                        className={`${'bg-yellow-400 text-black'} duration-200 py-1`}
                                        disabled={true}
                                    >
                                        Full HD
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className='justify-self-center self-center my-8'>
                            <iframe
                                className='w-[85vw] h-[315px] sm:w-[85vw] md:w-[560px] lg:w-[560px] xl:w-[560px] 2xl:w-[560px]'
                                src={movie?.videoUrl}
                                title='YouTube video player'
                                frameBorder='0'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <section className='border-t border-gray-600 py-8 lg:py-16 antialiased'>
                        <div className='max-w-2xl mx-auto px-4'>
                            <div className='w-full flex flex-row justify-between'>
                                <div className='flex justify-between items-center mb-6'>
                                    <h2 className='text-2xl lg:text-2xl font-bolddark:text-white'>
                                        Discussion {`(${allReviews.length} reviews)`}
                                    </h2>
                                </div>
                                <form className='mb-6 self-end'>
                                    <button
                                        onClick={handleWriteReviewClick}
                                        type='button'
                                        className='inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-primaryGreen rounded-lg'
                                    >
                                        Write a review!
                                    </button>
                                </form>
                            </div>

                            {isLoggedIn && (
                                <div className='flex justify-between items-center mb-4'>
                                    <h2 className='text-lg lg:text-2xl font-bold underline'>
                                        Your Review
                                    </h2>
                                </div>
                            )}

                            {ownReviews?.map((e: any) => {
                                return (
                                    <ReviewCard
                                        own={true}
                                        reviewBody={e}
                                        setReFetchReview={setReFetchReview}
                                        openModal={openModal}
                                    />
                                );
                            })}

                            {ownReviews?.length === 0 && (
                                <>
                                    <p className='text-center font-medium my-12'>
                                        {' '}
                                        You haven't gave a review for this movie 😔
                                    </p>
                                </>
                            )}

                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='text-lg lg:text-2xl font-bold underline'>
                                    All Reviews
                                </h2>
                            </div>

                            {allReviews?.map((e: any) => {
                                return <ReviewCard own={false} reviewBody={e} />;
                            })}
                            {allReviews?.length === 0 && (
                                <>
                                    <p className='text-center font-medium my-12'>
                                        {' '}
                                        No reviews available 😔
                                    </p>
                                </>
                            )}
                        </div>
                    </section>
                </ContainerLayout>
            </RootLayout>

            <ReviewModal
                isOpen={isModalOpen}
                onClose={closeModal}
                movieId={id || ''}
                setReFetchReview={setReFetchReview}
                existingData={isLoggedIn && !!ownReviews ? (ownReviews?.length === 0 ? undefined : ownReviews[0]) : undefined}
            />
        </>
    );
}

export default MovieDetails;
