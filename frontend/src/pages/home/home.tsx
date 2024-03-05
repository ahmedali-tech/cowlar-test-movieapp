import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContainerLayout from '../../Layout/ContainerLayout';
import { MovieCard } from '../../components/movie-card';
import Navbar from '../../components/navbar/navbar';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import RootLayout from '../../Layout/RootLayout';
import React from 'react';
import MovieModal from '../../components/modals/movie-modal';
import { useForm } from 'react-hook-form';

function Home() {
    const { register, handleSubmit } = useForm();

    const [isModalOpen, setModalOpen] = React.useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const onSubmit = (data: any) => {
        console.log(data);
    }

    console.log(isModalOpen);
    return (
        <>
            <RootLayout>
                <ContainerLayout>
                    <div className='flex flex-col'>
                        <div className='flex justify-between'>
                            <h2 className='capitalize text-2xl font-bold md:text-3xl'>
                                All Movies
                            </h2>
                            <button
                                type='button'
                                className='text-white bg-primaryGreen hover:bg-secondaryGreen font-medium rounded-lg text-sm px-4 py-2 text-center'
                                onClick={openModal}
                            >
                                <FontAwesomeIcon icon={faPlus} className='pr-1' />
                                Add Movie
                            </button>
                        </div>
                        <div className='py-5 flex items-end justify-center'>
                            <form onSubmit={handleSubmit(onSubmit)}>
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
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                                stroke-width='2'
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
                            {/* <h2 className="mt-24 capitalize text-3xl font-bold mb-6 md:text-4xl">
                            {"hi"}</h2> */}

                            <div className='grid grid-cols-1ta gap-x-5 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-7 lg:gap-y-14'>
                                <MovieCard />
                                <MovieCard />
                                <MovieCard />
                                <MovieCard />
                                <MovieCard />
                                <MovieCard />
                                <MovieCard />
                                <MovieCard />
                                <MovieCard />
                                <MovieCard />
                            </div>
                        </main>
                    </div>
                </ContainerLayout>
            </RootLayout>

            <MovieModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
}

export default Home;
