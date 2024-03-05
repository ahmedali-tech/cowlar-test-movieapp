import React, { FC, ReactNode } from 'react'
import { Navbar } from '../components/navbar'


type RootLayoutProps = {
    children: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default RootLayout