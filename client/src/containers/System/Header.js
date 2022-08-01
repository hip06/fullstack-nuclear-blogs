import React from 'react'
import logo from '../../assets/logowhite.png'
import { NavLink, Link } from 'react-router-dom'
import adMenu from '../../ultils/adMenu'
import icons from '../../ultils/icons'
import Tippy from '@tippyjs/react'
import { useSelector } from 'react-redux'
import { path } from '../../ultils/constant'


const { AiOutlineLogout, FiMenu } = icons
const isNotActiveStyle = 'border-l h-full flex items-center px-4 hover:text-gray-200 transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'border-l h-full flex items-center bg-slate-800 px-4 transition-all duration-200 ease-in-out capitalize';

const Header = () => {
    const userData = useSelector(state => state.user.userData)
    return (
        <div className='w-full h-full flex justify-between text-white items-center px-3'>
            <div className='md:hidden pr-3'>
                <FiMenu size={30} />
            </div>
            <div className='flex-1 h-full flex items-center justify-center md:justify-start'>
                <Link to={userData?.roleCode === 'ADMIN' ? 'admin' : userData?.roleCode === 'CRE' ? 'creator' : '*'} className='relative mr-16'>
                    <img src={logo} className='w-36 object-cover' alt="logo" />
                    <span className='absolute left-[calc(100%+5px)] top-[2px] font-yellowtail'>manage</span>
                </Link>
                <div className='hidden md:flex h-full'>
                    {adMenu.map(item => {
                        return (
                            <NavLink to={`${item.id}`} key={item.id} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
                                {item.value}
                            </NavLink>
                        )
                    })}
                </div>
            </div>
            <Link to={path.HOME} className='flex-9 p-2 hover:bg-gray-600 hover:rounded-full'>
                <Tippy content='Trở về trang chủ'>
                    <div><AiOutlineLogout size={30} /></div>
                </Tippy>
            </Link>
        </div>
    )
}

export default Header