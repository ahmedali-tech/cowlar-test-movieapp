import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ContainerLayout from "../../Layout/ContainerLayout"
import { MovieCard } from "../../components/movie-card"
import Navbar from "../../components/navbar/navbar"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import RootLayout from "../../Layout/RootLayout"


function Home() {
    return (
        <>
            <RootLayout>
                <ContainerLayout>
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <h2 className="capitalize text-2xl font-bold md:text-3xl">All Movies</h2>
                            {/* <h2 className="text-[30px] padding-5">All Movies</h2> */}
                            <button type="button" className="text-white bg-primaryGreen hover:bg-secondaryGreen font-medium rounded-lg text-sm px-4 py-2 text-center"><FontAwesomeIcon icon={faPlus} className="pr-1" />Add Movie</button>
                        </div>


                        <main className="mx-auto max-w-7xl px-5 my-12">
                            {/* <h2 className="mt-24 capitalize text-3xl font-bold mb-6 md:text-4xl">
                            {"hi"}</h2> */}

                            <div className="grid grid-cols-1ta gap-x-5 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-7 lg:gap-y-14">
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

        </>




    )
}

export default Home