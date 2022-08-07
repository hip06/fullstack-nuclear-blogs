import React, { useEffect, useState, useCallback } from 'react'
import avatarAnonymous from '../../assets/avatarAnonymous.jpg'
import { Button } from '../../components'
import { text } from '../../ultils/constant'
import icons from '../../ultils/icons'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { apiGetOneById } from '../../services/userServices'
import { arrayBufferToBase64 } from '../../ultils/toBase64'

const { VscStarFull, VscStarEmpty, AiOutlinePlus, MdGroupAdd } = icons

const Profile = ({ userCurrent }) => {
    const { userId } = useParams()
    const [userData, setUserData] = useState({})
    console.log('profile');
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await apiGetOneById(userId)
            if (response?.data.err === 0) setUserData(response?.data?.response)
        }
        fetchUserData()
    }, [userId])
    // console.log(userCurrent);

    const handleAddFriend = useCallback(() => {
        console.log({
            from: userCurrent?.id,
            to: userData?.id
        })
    }, [])

    const handleStar = () => {
        const stars = []
        for (let i = 6; i >= +userData?.positionCode; i--) stars.push(<VscStarFull size={18} color='orange' />)
        for (let i = +userData?.positionCode - 1; i >= 1; i--) stars.push(<VscStarEmpty size={18} />)

        return stars
    }

    return (
        <div className='w-full flex justify-center h-full'>
            <div className='max-w-1000 w-full mt-2 bg-white h-full flex justify-start items-start flex-col p-5 gap-7'>
                <div className='flex items-start gap-5 w-full'>
                    <div className='avatar'>
                        <img
                            src={arrayBufferToBase64(userData?.avatar) || userData?.avatarUrl || avatarAnonymous}
                            alt="avatar"
                            className='w-48 h-48 object-cover rounded-md'
                        />
                        <div className='flex items-center gap-1 w-48 justify-center mt-2'>
                            {handleStar().map((Item, index) => {
                                return <span key={index}>{Item}</span>
                            })}
                        </div>
                    </div>
                    <div className='w-full h-48'>
                        <div className='flex items-center w-full justify-between'>
                            <h4 className='flex items-center gap-3 font-medium text-xl'>
                                {userData?.Position?.value}<span>-</span>
                                {userData?.firstName && userData?.lastName ? <span>{`${userData?.firstName} ${userData?.lastName}`}</span> : <span>{text.NO_NAME}</span>}
                            </h4>
                            {userCurrent?.id !== userData?.id && <div className='flex items-center gap-2'>
                                <Button bgColor='bg-orange' text='Theo dõi' IcBefore={MdGroupAdd} />
                                <Button bgColor='bg-[#4A6B8A]' text='Thêm bạn' IcBefore={AiOutlinePlus} handleOnClick={handleAddFriend} />
                            </div>}
                        </div>
                        <div className='border w-fit px-4 py-2 text-sm rounded-md text-slate-500'>
                            {userData?.Role?.value}
                        </div>
                        <p className='mt-4 p-2 pl-4 italic border-l-4 text-sm bg-slate-100  w-fit min-h-24'>
                            {userData?.description ? userData?.description : text.DEFAULT_DESC}
                        </p>
                    </div>

                </div>
                <div className='information w-full'>
                    <div className='border-y py-2 w-full flex items-center justify-between'>
                        <h3 className='text-xl font-medium'>{text.PERSONAL_INFORMATION}</h3>
                        <Button text='Chỉnh sửa' bgColor='bg-blue' />
                    </div>
                    <div className='content-info py-4 pb-7'>
                        <p><b>ID: </b>{userData?.id}</p>
                        <p><b>Email: </b>{userData?.email}</p>
                        <p><b>Họ: </b>{userData?.lastName}</p>
                        <p><b>Tên: </b>{userData?.firstName}</p>
                        <p><b>Sinh nhật: </b>{userData?.birthday}</p>
                        <p><b>Voted: </b>{userData?.star}</p>
                        <p><b>Followers: </b>12k</p>
                        <p><b>Followings : </b>500</p>
                        <p><b>Ngày tạo tài khoản: </b>{`${moment(userData?.createdAt).format('DD/MM/YYYY')} (${moment(userData?.createdAt).fromNow()})`}</p>

                    </div>
                    <h3 className='text-xl font-medium border-y py-2 w-full'>{text.FRIEND}</h3>
                </div>
            </div>
        </div>
    )
}

export default Profile