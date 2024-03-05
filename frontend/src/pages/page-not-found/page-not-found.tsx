import { useEffect } from 'react'
import toast from 'react-hot-toast'
import RootLayout from '../../Layout/RootLayout';
import FormPageLayout from '../../Layout/FormPageLayout';


function PageNotFound() {
    useEffect(() => {
        toast("Looks like you're hanging around", { icon: "😉" })
    }, [])

    return (
        <>

            <FormPageLayout>
                <RootLayout>
                    <div className='flex min-h-screen items-center justify-center px-4'>
                        <p className='w-full text-center font-medium text-primaryGreen'>
                            not here mate, this is 404. doesnt exist ;)
                        </p>
                    </div>
                </RootLayout>
            </FormPageLayout>
        </>

    )
}

export default PageNotFound