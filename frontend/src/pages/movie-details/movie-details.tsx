import React from 'react';
import { useParams } from 'react-router-dom';
import RootLayout from '../../Layout/RootLayout';
import ContainerLayout from '../../Layout/ContainerLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilm,
    faGlobe,
    faShareNodes,
    faTrash,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';
import {
    faCalendar,
    faClock,
    faClosedCaptioning,
    faPenToSquare,
    faUser
} from '@fortawesome/free-regular-svg-icons';
import Modal from '../../components/modals/review-modal';
import ReviewCard from '../../components/review-card';

function MovieDetails() {
    const { id } = useParams();
    const isFavourite = false;

    const [isModalOpen, setModalOpen] = React.useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };









    console.log(id);
    return (
        <>
            <RootLayout>
                <div
                    style={{
                        backgroundImage: `url(${'https://image.tmdb.org/t/p/w185/46sp1Z9b2PPTgCMyA87g9aTLUXi.jpg'})`,
                    }}
                    className='bg-cover w-full aspect-video relative bg-center lg:max-h-[800px]'
                >
                    <div className='inset-0 bg-black/90 px-4 pb-10 pt-24 flex items-center lg:absolute'>
                        <div className='w-full max-w-7xl mx-auto flex flex-col items-center gap-12 md:flex-row'>
                            <img src={'https://image.tmdb.org/t/p/w185/46sp1Z9b2PPTgCMyA87g9aTLUXi.jpg'}
                                alt={'Inglorious Bastards'}
                                className='aspect-[2/3] rounded w-full max-w-[300px]'
                            />
                            <div className='w-full'>
                                <h2 className='text-4xl font-extrabold lg:text-5xl'>
                                    {'Inglorious Bastards'}
                                </h2>
                                {/* <span className="text-primary font-bold">
                                        {"movie.origin_name"}
                                    </span> */}
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
                                        <FontAwesomeIcon
                                            icon={faCalendar}
                                            height={16}
                                            color='red'
                                        />
                                        {'2022'}
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
                                        Thriller
                                    </span>
                                    <div className='flex items-center gap-2 my-2'>
                                        <FontAwesomeIcon icon={faGlobe} height={16} color='red' />
                                        Hollywood
                                    </div>
                                </div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: `lorem ipsum gracias que pasa vamos`,
                                    }}
                                    className='text-sm'
                                />
                                <div className='border border-white/5 bg-white/5 px-4 py-4 flex items-center w-max rounded-lg mt-8 gap-1.5 md:gap-5 md:px-7'>
                                    <button className='flex-col justify-center items-center gap-1 text-sm flex hover:text-primary'>
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
                                        <button className='rounded-full bg-primaryGreen text-white px-8 py-3 disabled:bg-zinc-600 disabled:hover:bg-zinc-600 disabled:text-white'>
                                            <FontAwesomeIcon
                                                icon={faVideo}
                                                className='h-4 mr-1'
                                                height={16}
                                                color='white'
                                            />
                                            Trailer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ContainerLayout>
                    <div className='mx-auto max-w-7xl flex flex-col'>
                        <div className='text-sm px-5'>
                            <ul key={'server.server_name'}>
                                <p className='text-[24px] font-bold mb-4 mt-8'>
                                    Watch Online
                                </p>
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
                                src='https://www.youtube.com/embed/KnrRy6kSFF0?si=I0m8o91IJ9DUpCvt'
                                title='YouTube video player'
                                frameBorder='0'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <section className="dark:bg-gray-900 py-8 lg:py-16 antialiased">
                        <div className="max-w-2xl mx-auto px-4">
                            <div className='w-full flex flex-row justify-between'>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg lg:text-2xl font-bolddark:text-white">Discussion {`(${20})`}</h2>
                                </div>
                                <form className="mb-6 self-end">
                                    <button
                                        onClick={openModal}
                                        className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-primaryGreen rounded-lg"                                    >
                                        Write a review!
                                    </button>
                                    {/* <div className="py-2 px-4 mb-4 bg-[#292929] text-[#e7e7e7] rounded-lg rounded-t-lg border border-gray-700 dark:bg-gray-800 dark:border-gray-700">
                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                    <textarea id="comment" rows={6}
                                        className="px-0 w-full text-sm bg-[#292929] text-[#e7e7e7] border-0 focus:ring-0 focus:outline-none"
                                        placeholder="Write a comment..." required>

                                    </textarea>
                                </div> */}
                                    {/* <button type="submit"
                                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primaryGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                    Post comment
                                </button> */}
                                </form>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg lg:text-2xl font-bolddark:text-white">Your Review</h2>
                            </div>

                            {/* <article className="p-6 text-base bg-[#292929] rounded-lg dark:bg-gray-900 my-3">
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
                                    <div className='flex justify-between gap-4'>
                                        <FontAwesomeIcon icon={faPenToSquare} className='h-[20px] cursor-pointer' color='white'/>
                                        <FontAwesomeIcon icon={faTrash} className='h-[20px] cursor-pointer' color='red'/>

                                    </div>
                                </footer>
                                <p className="text-[#d1d1d1] dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, temporibus?</p>
                            </article> */}

                            <ReviewCard own={true}/>

                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg lg:text-2xl font-bolddark:text-white">Others Reviews</h2>
                            </div>

                            <ReviewCard own={false}/>
                            <ReviewCard own={false}/>
                            <ReviewCard own={false}/>
                            <ReviewCard own={false}/>


                            {/* <article className="p-6 text-base bg-[#292929] rounded-lg dark:bg-gray-900 my-3">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm text-[#e7e7e7] dark:text-white font-semibold">
                                            <div className='flex items-center'>
                                                <FontAwesomeIcon
                                                    icon={faUser}
                                                    className="mr-2 w-6 h-6 rounded-full bg-[#f6f6f6] p-2"
                                                    height={16}
                                                    color='black'
                                                /> {"Michael Gough"}
                                            </div>
                                        </p>
                                        <p className="text-sm text-[#d1d1d1] dark:text-gray-400"><time dateTime="2022-02-08"
                                            title="February 8th, 2022">Feb. 8, 2022</time></p>
                                    </div>
                                </footer>
                                <p className="text-[#d1d1d1] dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, temporibus?</p>
                            </article> */}




                        </div>
                    </section>
                </ContainerLayout>
            </RootLayout>

            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
}

export default MovieDetails;
