import { FC, ReactNode } from 'react'

type Props = {
    children: ReactNode;
};

const ContainerLayout: FC<Props> = ({ children }) => {
    return (

        <>
            
                {children}
           
        </>
    )
}

export default ContainerLayout