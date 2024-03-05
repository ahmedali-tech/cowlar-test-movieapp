import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContainerLayout from '../../Layout/ContainerLayout';
import { MovieCard } from '../../components/movie-card';
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import RootLayout from '../../Layout/RootLayout';
import React, { useContext } from 'react';
import MovieModal from '../../components/modals/movie-modal';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { getAllMovies } from '../../api/movies';
import Loading from '../../components/loading';
import { UserContext } from '../../context';
import useAuthVerification from '../../hooks/useAuthentication';
import { Link } from 'react-router-dom';

function Home() {
    const { register, handleSubmit } = useForm();

    const { isLoggedIn, user } = useContext(UserContext);
    // const {shouldRefetchMovies, setShouldRe}

    const { pageLoading } = useAuthVerification();

    console.log("home->isLoggedIn->", isLoggedIn);
    console.log("home->user->", user);

    const [isPageLoading, setIsPageLoading] = React.useState<boolean>(false);
    const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
    const [movies, setMovies] = React.useState([]);

    const openModal = () => {
        isLoggedIn ? setModalOpen(true) : toast("Wont work! You need to login first!", { icon: "🙂" })
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const reFetchMovies = async (data: any) => {
        const movieId = data.search;
        try {
            setIsPageLoading(true);
            const { data } = await getAllMovies(movieId) as any;
            setMovies(data)
            setIsPageLoading(false);
        } catch (error) {
            toast.error("There was an error fetching movies, try refreshing!", { className: "text-center" })
        }
    }

    React.useEffect(() => {
        (async () => {
            try {
                setIsPageLoading(true);
                const { data } = await getAllMovies("") as any;
                console.log("from use effect: ", data);
                setMovies(data)
                setIsPageLoading(false);
            } catch (error) {
                console.log('error', error);
                toast.error("There was an error fetching movies, try refreshing!", { className: "text-center" })
            }
        })()
    }, [])

    if (isPageLoading) {
        return (
            <>
                <Toaster />
                <RootLayout>
                    <div className="w-screen h-screen flex items-center justify-center">
                        <Loading />
                        <p className="mx-2">Loading ...</p>
                    </div>
                </RootLayout>
            </>
        );
    }

    if (pageLoading) {
        return (
            <>
                <Toaster />
                <RootLayout>
                    <div className="w-screen h-screen flex items-center justify-center">
                        <Loading />
                        <p className="mx-2">Loading ...</p>
                    </div>
                </RootLayout>
            </>
        );
    }

    return (
        <>
            <Toaster />
            <RootLayout>
                <ContainerLayout>
                    <div className='flex flex-col'>
                        <div className='flex justify-center flex-wrap gap-3 sm:justify-between'>
                            <h2 className='capitalize text-2xl font-bold md:text-3xl'>
                                All Movies
                            </h2>
                            <div className='flex gap-4'>
                                <button
                                    type='button'
                                    className='text-white bg-primaryGreen hover:bg-secondaryGreen font-medium rounded-lg text-sm px-4 py-2 text-center'
                                    onClick={openModal}
                                >
                                    <FontAwesomeIcon icon={faPlus} className='pr-1' />
                                    Add Movie
                                </button>
                                <Link
                                    to={"/own-movies"}
                                    className='text-white bg-primaryGreen hover:bg-secondaryGreen hover:text-white font-medium rounded-lg text-sm px-4 py-2 text-center'
                                >
                                    <FontAwesomeIcon icon={faArrowRight} className='pr-1' />
                                    Go to Own Movies
                                </Link>
                            </div>
                        </div>
                        <div className='py-5 flex items-end justify-center'>
                            <form onSubmit={handleSubmit(reFetchMovies)}>
                                <label
                                    htmlFor='default-search'
                                    className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                                >
                                    Search
                                </label>
                                <div className='relative w-[75vw] sm:w-[500px]'>
                                    <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                                        <svg
                                            className='w-4 h-4 text-gray-500 dark:text-gray-400'
                                            aria-hidden='true'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 20 20'
                                        >
                                            <path
                                                stroke='currentColor'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type='search'
                                        id='default-search'
                                        className='block  w-[75vw] sm:w-[500px] p-4 ps-10 text-sm rounded-lg border border-gray-300 text-white bg-[#292929] focus:border-primary-600 focus:ring-primary-600 sm:text-sm '
                                        placeholder='Search ...'
                                        {...register('search')}
                                    />

                                    <button
                                        type='submit'
                                        className='text-white absolute end-2.5 bottom-2.5 ml-16 bg-primaryGreen hover:bg-secondaryGreen font-medium rounded-lg text-sm px-4 py-2'
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>

                        <main className='mx-auto max-w-7xl px-5 my-12'>
                            <div className='grid grid-cols-1ta gap-x-5 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-7 lg:gap-y-14'>
                                {
                                    movies?.map((e: any) => {
                                        return (
                                            < MovieCard id={e._id} title={e.name} imgUrl={e.imgUrl} releaseYear={e.releaseYear} genre={e.genre} />
                                        )
                                    })
                                }
                            </div>
                            {
                                movies.length === 0 && (
                                    <>
                                        <p className='text-center font-medium'> No movies found :(</p>
                                    </>
                                )
                            }
                        </main>
                    </div>
                </ContainerLayout>
            </RootLayout>

            <MovieModal isOpen={isModalOpen} onClose={closeModal} onSubmit={reFetchMovies} />
        </>
    );
}

export default Home;
