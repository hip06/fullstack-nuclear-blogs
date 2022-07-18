import React, { useState, memo } from 'react'
import logo from '../../assets/logored.png'
import { FiMenu } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import avatarAnonymous from '../../assets/avatarAnonymous.jpg'
import { AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai'
import { useDispatch } from 'react-redux/es/exports'
import { logout } from '../../store/actions'
import Tippy from '@tippyjs/react';
import { useNavigate } from 'react-router-dom'
import { arrayBufferToBase64 } from '../../ultils/toBase64'
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs'


const Header = ({ userData, setIsShowSidebar, isLoggedIn }) => {
    const [isHideNotice, setIsHideNotice] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <div className='w-full flex items-center relative gap-5 px-3 md:px-5 justify-between'>
            <div
                className='md:hidden flex justify-start w-1/4 cursor-pointer'
                onClick={() => setIsShowSidebar(true)}
                title='Mở menu'
            >
                <FiMenu size={25} />
            </div>
            <div className='md:hidden w-1/2 flex justify-center'>
                <img src={logo} alt="logo" className='w-28 object-cover' />
            </div>
            <div className='absolute left-2 right-2 top-[75px] md:relative md:top-0 md:flex md:w-full gap-[50px] justify-start'>
                <div className='hidden md:flex gap-3 justify-center items-center'>
                    <Tippy content='Back'>
                        <div onClick={() => navigate(-1)} className='p-2 hover:bg-gray-200 cursor-pointer rounded-full md:flex'>
                            <BsFillCaretLeftFill size={25} />
                        </div>
                    </Tippy>
                    <Tippy content='Go forward'>
                        <div className='p-2 hover:bg-gray-200 cursor-pointer rounded-full md:flex'>
                            <BsFillCaretRightFill size={25} />
                        </div>
                    </Tippy>
                </div>
                <input type="text"
                    className='py-2 px-4 w-full outline-none border-none shadow-md md:shadow-none rounded-[20px] lg:w-2/3 placeholder:text-gray-500 placeholder:text-sm placeholder:italic md:bg-gray-100 '
                    placeholder='Tìm kiếm theo tags, môn học, chủ đề ...'
                />
            </div>
            <div className='w-1/4 flex justify-end'>
                {isLoggedIn
                    ? <div className='w-full flex md:justify-between gap-2 justify-end items-center px-2 relative'>
                        <img
                            src={arrayBufferToBase64(userData?.avatar) || userData?.avatarUrl || avatarAnonymous}
                            className='w-12 h-12 rounded-full object-cover cursor-pointer'
                            alt="avatar"
                            onClick={() => setIsHideNotice(!isHideNotice)}
                            referrerPolicy="no-referrer"
                        />
                        {!isHideNotice && <div className="absolute z-10 text-white top-[52px] bg-[#333333] rounded-sm md:right-[74px] right-[20px] lg:right-[120px] min-w-200 shadow-md">
                            <div className='flex flex-col'>
                                <Link
                                    to={`profile/${userData?.id}`}
                                    className=' p-2 py-2 hover:bg-[rgba(255,255,255,0.2)]'
                                    onClick={() => setIsHideNotice(true)}
                                >
                                    Thông tin cá nhân
                                </Link>
                                <Link
                                    to={`/system/setting-authentication`}
                                    className=' p-2 py-2 hover:bg-[rgba(255,255,255,0.2)]'
                                >
                                    Bảo mật
                                </Link>
                                {userData?.roleCode === 'ADMIN' && <Link
                                    to={`/system/admin`}
                                    className=' p-2 py-2 hover:bg-[rgba(255,255,255,0.2)]'
                                >
                                    Đi tới quản trị Admin
                                </Link>}
                                {userData?.roleCode === 'CRE' && <Link
                                    to={`/system/creator`}
                                    className=' p-2 py-2 hover:bg-[rgba(255,255,255,0.2)]'
                                >
                                    Đi tới quản trị Creator
                                </Link>}
                            </div>
                        </div>}
                        <Tippy content='Đăng xuất'>
                            <div
                                className='p-2 hover:bg-gray-200 cursor-pointer rounded-full hidden md:flex'
                                onClick={handleLogout}
                            >
                                <AiOutlineLogout size={30} />
                            </div>
                        </Tippy>
                    </div>
                    : <Link to={'/login'}>
                        <Tippy content={'Đăng nhập'}>
                            <div className='p-2 hover:bg-gray-200 cursor-pointer rounded-full hidden md:flex'>

                                <AiOutlineLogin size={30} />
                            </div>
                        </Tippy>
                    </Link>}
            </div>
        </div>
    )
}

export default memo(Header)