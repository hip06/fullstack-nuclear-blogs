import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getOne } from '../../store/actions'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Scrollbars from 'react-custom-scrollbars-2'
import icons from '../../ultils/icons'

//IMPORT COMPONENT
import Sidebar from './Sidebar'
import Header from './Header'

const { GrClose } = icons

const Home = ({ token, userData, isLoggedIn }) => {

    const [isShowSidebar, setIsShowSidebar] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (token) {
            dispatch(getOne(token))
        }
    }, [dispatch])

    return (
        <>
            <div className='relative bg-gray-100 text-black h-screen flex w-screen'>
                <div className='w-2/5 lg:w-1/4 shadow-md md:shadow-none bg-white md:flex hidden' >
                    <Sidebar userData={userData} />
                </div>
                {isShowSidebar && <div className='absolute top-0 left-0 h-screen bg-white w-3/5 shadow-md animate-slide-in z-10'>
                    <Sidebar userData={userData} />
                    <div
                        className='absolute p-4 top-0 right-0 cursor-pointer'
                        title='Đóng menu'
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsShowSidebar(false)
                        }}
                    >
                        <GrClose size={21} />
                    </div>
                </div>}
                <div className='w-full h-screen'>
                    <div className='w-full h-header bg-white flex items-center shadow-md md:shadow-none'>
                        <Header userData={userData} setIsShowSidebar={setIsShowSidebar} isLoggedIn={isLoggedIn} />
                    </div>
                    <div className='w-full h-rHeader flex justify-center items-center p-2 pr-0 pt-20 md:pt-2'>
                        <Scrollbars autoHide style={{ width: "100%", height: '100%' }}>
                            <Outlet />
                        </Scrollbars>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
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

export default Home