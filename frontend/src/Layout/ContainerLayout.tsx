import { FC, ReactNode } from 'react'

type Props = {
    children: ReactNode;
};

const ContainerLayout: FC<Props> = ({ children }) => {
    return (

        <>
            <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-20 2xl:mx-32 my-8">
                {children}
            </div>
        </>
    )
}

export default ContainerLayout