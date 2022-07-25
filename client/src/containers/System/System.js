import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { getOne } from '../../store/actions'
// IMPORT COMPONENT
import Header from './Header';



const System = ({ user }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (user?.currentLoggendIn?.token) {
            dispatch(getOne(user.currentLoggendIn.token))
        }
    }, [dispatch])

    return (
        <>
            <div className='w-screen h-screen bg-gray-100 text-black'>
                <div className='w-full h-adHeader bg-red'>
                    <Header />
                </div>
                <div className='w-full h-rAdHeader'>
                    <Outlet />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{ backgroundColor: "rgb(31,31,31)", color: 'white' }}
            />

        </>
    )
}

export default System