import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import moment from 'moment'
import { getOne } from '../../store/actions';

const Manage = ({ userData, token }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (token) {
            dispatch(getOne(token))
        }
    }, [dispatch])

    return (
        <div className='h-rAdHeader w-full flex justify-start items-start p-3'>
            <div className='w-full max-w-800 bg-white rounded-md p-3'>
                <h1 className='font-bold text-xl mb-5'>Thông tin tài khoản:</h1>
                {userData && <ul>
                    <li><b>UserID:</b> {userData.id}</li>
                    <li><b>Họ và tên:</b> {`${userData.lastName} ${userData.firstName}`}</li>
                    <li><b>Email:</b> {userData.email}</li>
                    <li><b>Sinh nhật:</b> {userData.birthday}</li>
                    <li><b>Role:</b> {userData.roleCode}</li>
                    <li><b>Chức danh hiện tại:</b> {userData.positionCode}</li>
                    <li><b>Ngày tạo tài khoản:</b> {`${moment(userData.createdAt).format('DD/MM/YYYY')} (${moment(userData.createdAt).fromNow()})`}</li>
                    <li><b>Số người theo dõi:</b> {userData.star || 0}</li>
                    <li><b>Mô tả bản thân:</b> {userData.description || ' Chưa có'}</li>

                </ul>}

            </div>
        </div>
    )
}

export default Manage