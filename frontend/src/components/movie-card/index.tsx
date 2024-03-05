import { FC } from 'react';

type MovieCardProps = {
};

export const MovieCard: FC<MovieCardProps> = () => {

    // const staticSrc = 'https://images.unsplash.com/photo-1682686581312-506a8b53190e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const staticSrc = 'https://m.media-amazon.com/images/M/MV5BNmE1ZTc1YjQtNDIzMi00ZTBjLThmYmUtMTUyYTc1NjRlOWI4XkEyXkFqcGdeQXVyMTY3ODkyNDkz._V1_QL75_UX280_CR0,0,280,414_.jpg';
    const staticName = 'Movie Title';
    const staticYear = '2022';
    const staticQuality = 'HD';
    const staticLang = 'English';
    const staticTime = '2h 30min';

    return (
        <div className='select-none group' style={{ width: '230px', height: "345px" }}>
            <div className='relative rounded-lg overflow-hidden'>
                <img src={staticSrc} alt={staticName} className='aspect-[2/3] w-[100%] h-[100%]' />
                <a
                    href={`#`}
                    className='absolute inset-0 z-10 md:hidden'
                />
                <div className='absolute inset-0 bg-black/70 none flex-col items-center justify-center gap-4 text-sm font-bold opacity-0 group-hover:opacity-100 duration-300 text-center hidden md:flex'>
                    <a
                        href={`#`}
                        className='rounded-full border-2 text-primaryGreen border-primaryGreen w-36 px-6 py-2.5 bg-black/20 translate-y-3 group-hover:translate-y-0 duration-300 hover:bg-primary hover:text-primaryGreen'
                    >
                        Watch
                    </a>
                    <h3 className='flex items-center justify-between my-1.5 gap-5 md:my-3'>
                        <a
                            href={`#`}
                            className='text-primaryGreen hover:text-secondaryGreen duration-150 text-lg font-bold truncate no-underline hover:underline'
                        >
                            <abbr title={staticName} className='no-underline'>
                                {staticName}
                            </abbr>
                        </a>
                        <span className='text-primaryGreen text-sm font-medium hidden md:block'>
                            {staticYear}
                        </span>
                    </h3>
                    {staticQuality && (
                        <div className='flex flex-col gap-1.5 justify-between text-xs md:items-center md:flex-row'>
                            <div className='flex items-center gap-2'>
                                <span className='border-2 border-primaryGreen px-2 py-0.5'>
                                    <strong className='text-white'>{staticQuality}</strong>
                                </span>
                                <span className=' px-2 py-1'>
                                    <strong className='text-white'>{staticLang}</strong>
                                </span>
                            </div>
                            <span className='text-white flex items-center gap-2 truncate'>
                                {staticTime}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

