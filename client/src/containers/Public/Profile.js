import React, { useEffect, useState } from 'react'
import avatarAnon from '../../assets/avatarAnonymous.jpg'
import { arrayBufferToBase64 } from '../../ultils/toBase64'
import { ImFacebook2 } from 'react-icons/im'
import { BsInstagram } from 'react-icons/bs'
import rankMap from '../../ultils/rank'
import Button from '../../components/Button'
import moment from 'moment'
import { MdStars } from 'react-icons/md'
import { apiGetOneByUserId } from '../../services/userServices'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const [userData, setUserData] = useState({})
    const { userId } = useParams()
    useEffect(() => {
        const fetchUserData = async () => {
            let response = await apiGetOneByUserId(userId)
            if (response?.data.err === 0) {
                setUserData(response.data.response)
            }
        }
        fetchUserData()
    }, [userId])
    // console.log(userData)
    // fetch data user
    // code followers, add friends, star
    return (
        <>
            <div className='max-w-1000 mx-auto p-2 px-4 pr-6 bg-white pb-7 mt-2 rounded-md relative'>
                <div className='flex p-16 w-full'>
                    <div className='information flex-1 flex flex-col justify-start items-start gap-2'>
                        <div className=''>
                            <img
                                src={rankMap.some(item => item.code === userData?.Position?.code) && rankMap.find(item => item.code === userData?.Position?.code).image || ''} className='w-36 h-36 object-cover' alt="rank"
                            />
                        </div>
                        <h2 className='font-medium text-2xl'>{userData?.firstName && userData?.lastName ? `${userData.lastName} ${userData.firstName}` : 'Chưa có tên'}</h2>
                        <div className='flex gap-2 items-center'>
                            {userData?.Role?.value && <small className='border rounded-md border-[#dc4535] px-6 py-1 text-[blue] font-medium'>
                                {userData?.Role?.value}
                            </small>}
                            {userData?.Position?.value && <small className='border rounded-md border-[#dc4535] px-6 py-1 text-[blue] font-medium'>
                                {userData?.Position?.value}
                            </small>}
                        </div>
                        <div className='about-me bg-neutral-100 pl-12 py-3 pr-3 border-l-[10px] w-full italic opacity-90 text-sm'>
                            {userData?.description || 'Say somethings !'}
                        </div>
                    </div>
                    <div className='flex-1 flex flex-col justify-center items-end gap-3'>
                        <div className='relative'>
                            <img src={arrayBufferToBase64(userData?.avatar) || userData?.avatarUrl || avatarAnon} className='w-48 h-48 object-cover rounded-md' alt="avatar" />
                        </div>
                        <div className='icons flex gap-2 items-center justify-end'>
                            <ImFacebook2 size={18} color={'blue'} />
                            <BsInstagram size={18} color={'#E84A5A'} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-1000 mx-auto p-2 px-4 pr-6 bg-white pb-7 mt-4 rounded-md'>
                <div className='py-2 border-b flex items-center justify-between'>
                    <h2 className='text-xl font-medium '>
                        Thông tin cá nhân
                    </h2>
                    <Button text={'Chỉnh sửa'} bgColor={'bg-[#47BE2E]'} />
                </div>
                {userData && <ul className='py-4'>
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
                </ul>}
                <div className='py-2 border-b flex items-center justify-between'>
                    <h2 className='text-xl font-medium '>
                        Bạn bè
                    </h2>
                </div>
                <div className='py-4'>
                    List friends here
                </div>
            </div>

        </>
    )
}

export default Profile