import React, { memo, useState, useEffect } from 'react'
import logo from '../../assets/logored.png'
import { NavLink, Link } from 'react-router-dom'
import { apiGetSpecialization } from "../../services/appService";
import avatarAnonymous from '../../assets/avatarAnonymous.jpg'
import { arrayBufferToBase64 } from '../../ultils/toBase64';
import { path } from '../../ultils/constant';
import icons from '../../ultils/icons';

const { FaRegHandPointDown, MdOutlineArrowForwardIos } = icons
const isNotActiveStyle = 'flex items-center gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize mb-5 w-full';
const isActiveStyle = 'flex items-center gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize mb-5 w-full';

const Sidebar = ({ userData }) => {
    const [specialization, setSpecialization] = useState([])
    useEffect(() => {
        const fetchDataSpecialization = async () => {
            let response = await apiGetSpecialization()
            if (response?.data.err === 0) {
                setSpecialization(response.data?.response)
            }
        }
        fetchDataSpecialization()
    }, [])

    return (
        <div className=' flex flex-col w-full h-full flex-col justify-between '>
            <div className='p-4 w-full pr-0'>
                <Link to={path.HOME}>
                    <img src={logo} alt="logo" className='w-32 my-3 mb-8 object-cover' />
                </Link>
                <NavLink
                    to={`/`}
                    className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                >
                    Trang chủ
                </NavLink>
                <div className='text-sm mb-5 flex gap-3 items-center text-[#DC4535]'>
                    Discover category <FaRegHandPointDown size={15} />
                </div>
                {specialization.length > 0 && specialization.map(item => {
                    return (
                        <NavLink
                            key={item.code}
                            to={`/specialization/${item.code.toLowerCase()}`}
                            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                        >
                            {item.value}
                        </NavLink>
                    )
                })}
            </div>
            {userData && <div className='w-full bg-gray-100 p-2 hover:bg-red-100 cursor-pointer flex justify-between items-center'>
                <Link to={`${path.PROFILE}/${userData.id}`} className='flex gap-3 '>
                    <img
                        src={arrayBufferToBase64(userData?.avatar) || userData?.avatarUrl || avatarAnonymous}
                        className='w-12 h-12 rounded-md object-cover'
                        alt="avatar"
                        referrerPolicy="no-referrer"
                    />
                    <span className='flex items-center'>{userData?.lastName && userData?.firstName ? `${userData.lastName} ${userData.firstName}` : 'Chưa có tên'}</span>
                </Link>
                <MdOutlineArrowForwardIos />
            </div>}
        </div>
    )
}

export default memo(Sidebar)