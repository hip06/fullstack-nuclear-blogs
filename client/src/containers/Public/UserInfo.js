import React from 'react'
import { MdStars } from 'react-icons/md'
import moment from 'moment'

const UserInfo = ({ userData }) => {
    return (
        <ul className='py-4'>
            <li className='flex gap-2 items-center py-1'>
                <span className='font-medium'>Email:</span>
                <span>{userData?.email}</span>
            </li>
            <li className='flex gap-2 items-center py-1'>
                <span className='font-medium'>UserId:</span>
                <span>{userData?.id}</span>
            </li>
            <li className='flex gap-2 items-center py-1'>
                <span className='font-medium'>Vai trò:</span>
                <span>{userData?.Role?.value}</span>
            </li>
            <li className='flex gap-2 items-center py-1'>
                <span className='font-medium'>Cấp bậc:</span>
                <span>{userData?.Position?.value}</span>
            </li>
            <li className='flex gap-2 items-center py-1'>
                <span className='font-medium'>Sinh nhật:</span>
                <span>{moment(userData.birthday).format('DD/MM/YYYY')}</span>
            </li>
            <li className='flex gap-2 items-center py-1'>
                <span className='font-medium'>Ngày tạo tài khoản:</span>
                <span>{moment(userData.createdAt).format('DD/MM/YYYY')}</span>
            </li>
            {(userData?.roleCode === 'ADMIN' || userData?.roleCode === 'CRE') && <li className='flex gap-1 items-center py-1'>
                <span className='font-medium'>Số sao:</span>
                <span>{userData?.star}</span>
                <MdStars size={18} color={'#D4876A'} />
            </li>}
        </ul>
    )
}

export default UserInfo