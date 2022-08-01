import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { path } from '../ultils/constant'
import { arrayBufferToBase64 } from '../ultils/toBase64'
import avatarAnonymous from '../assets/avatarAnonymous.jpg'

const ItemUser = ({ userData, bgColor }) => {
    return (
        <div>
            {userData && <div className={`w-full ${bgColor} p-2 cursor-pointer flex justify-between items-center`}>
                <Link to={`/${path.PROFILE}/${userData.id}`} className='flex gap-3 '>
                    <img
                        src={arrayBufferToBase64(userData?.avatar) || userData?.avatarUrl || avatarAnonymous}
                        className='w-12 h-12 rounded-md object-cover'
                        alt="avatar"
                        referrerPolicy="no-referrer"
                    />
                    <span className='flex items-center'>{userData?.lastName && userData?.firstName ? `${userData.lastName} ${userData.firstName}` : 'Chưa có tên'}</span>
                </Link>
            </div>}
        </div>
    )
}

export default memo(ItemUser)