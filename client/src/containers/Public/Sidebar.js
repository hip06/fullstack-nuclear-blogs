import React, { memo, useState, useEffect } from 'react'
import logo from '../../assets/logored.png'
import { NavLink, Link } from 'react-router-dom'
import { FaRegHandPointDown } from 'react-icons/fa'
import { apiGetSpecialization } from "../../services/appService";
import ItemUser from '../../components/ItemUser';

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
                <Link to={'/'}>
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
            <small className='w-full text-center text-gray-300 italic'>Blog is completed by hip06</small>
        </div>
    )
}

export default memo(Sidebar)