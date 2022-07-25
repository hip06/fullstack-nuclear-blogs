import React, { useEffect, useState, useCallback } from 'react'
import avatarAnon from '../../assets/avatarAnonymous.jpg'
import { arrayBufferToBase64 } from '../../ultils/toBase64'
import { ImFacebook2 } from 'react-icons/im'
import { BsInstagram, BsTwitter, BsPersonXFill } from 'react-icons/bs'
import rankMap from '../../ultils/rank'
import Button from '../../components/Button'
import Button2 from '../../components/Button2'
import UserInfo from './UserInfo'
import { apiGetOneByUserId, apiUpdateBonusUser, apiGetBonusUser } from '../../services/userServices'
import { useParams } from 'react-router-dom'
import { VscStarFull, VscStarEmpty } from 'react-icons/vsc'
import { MdPersonAdd } from 'react-icons/md'
import { GiShadowFollower } from 'react-icons/gi'
import { useSelector } from 'react-redux'
import { IoLogoYoutube } from 'react-icons/io'

const Profile = ({ token }) => {
    const [userData, setUserData] = useState({})
    const { userId } = useParams()
    const { id } = useSelector(state => state.user.currentLoggendIn)
    const [userBonusCurrent, setUserBonusCurrent] = useState({})
    const [userBonusParams, setUserBonusParams] = useState({})
    const [updateState, setUpdateState] = useState(false)
    useEffect(() => {
        const fetchUserData = async () => {
            let [response, resBonusParams, resBonusCurrent] = await Promise.all([apiGetOneByUserId(userId), apiGetBonusUser(userId), apiGetBonusUser(id)])
            if (response?.data.err === 0) setUserData(response.data.response)
            if (response?.data.err === 0) setUserBonusParams(...resBonusParams.data.response)
            if (response?.data.err === 0) setUserBonusCurrent(...resBonusCurrent.data.response)
        }
        fetchUserData()
    }, [userId, updateState])
    const renderStar = () => {
        let stars = []
        for (let i = 0; i < 7 - (+userData?.Position.code); i++) {
            stars.push(<VscStarFull color='orange' />)
        }
        for (let i = 0; i < +userData?.Position.code - 1; i++) {
            stars.push(<VscStarEmpty />)
        }
        return stars
    }
    const handleFriend = useCallback(async () => {
        let friends = JSON.stringify([userId])
        let response = await apiUpdateBonusUser(token, { friends })
        if (response?.data.err === 0) {
            setUpdateState(prev => !prev)
        }
    }, [])
    // console.log(JSON.parse(userBonusCurrent?.friends).some(item => item === userId));
    // console.log(userBonusCurrent)
    return (
        <>
            <div className='max-w-1000 mx-auto p-2 px-4 pr-6 bg-white pb-7 mt-2 rounded-md relative'>
                <div className='flex flex-1 p-16 w-full justify-between items-center gap-3'>
                    <div className='information flex flex-col justify-start items-center gap-2'>
                        <img
                            src={rankMap.some(item => item.code === +userData?.Position?.code) && rankMap.find(item => item.code === +userData?.Position?.code).image || ''} className='w-36 h-36 object-cover' alt="rank"
                        />
                        <div className='star flex items-center gap-1'>
                            {userData?.Position?.code && renderStar().length > 0 && renderStar().map((item, index) => {
                                return (<div key={index}>{item}</div>)
                            })}
                        </div>
                        <div className='font-splash text-4xl'>
                            {userData?.Position?.value}
                        </div>
                    </div>
                    <div className='flex flex-2 flex-col justify-start items-center gap-2'>
                        <div className=' flex gap-2 items-center'>
                            <h2 className='font-medium text-2xl'>{userData?.firstName && userData?.lastName ? `${userData.lastName} ${userData.firstName}` : 'Chưa có tên'}</h2>
                            <small className='px-4 py-1 bg-[yellow] text-gray-500'>
                                Chưa xác minh
                            </small>
                        </div>
                        <div className='flex gap-2 items-center'>
                            {userData?.Role?.value && <small className='border rounded-md border-[#dc4535] px-4 py-1 text-[blue] font-medium'>
                                {userData?.Role?.value}
                            </small>}
                            <small className='border rounded-md border-[#dc4535] px-4 py-1 text-[blue] font-medium'>
                                12k followers
                            </small>
                            <small className='border rounded-md border-[#dc4535] px-4 py-1 text-[blue] font-medium'>
                                12k followings
                            </small>
                        </div>
                        <div className='about-me bg-neutral-100 pl-12 py-3 pr-3 border-l-[10px] w-[70%] italic opacity-90 text-sm'>
                            {userData?.description || 'Say somethings !'}
                        </div>
                        {userId !== id && <div className='add-friend flex items-center mt-3'>
                            {userBonusCurrent?.friends ? <>
                                {JSON.parse(userBonusCurrent?.friends).some(item => item === userId)
                                    ? <Button2 Icon={BsPersonXFill} text={'Hủy kết bạn'} colorIcon={'blue'} handleOnClick={handleFriend} />
                                    : <Button2 Icon={MdPersonAdd} text={'Thêm bạn'} colorIcon={'blue'} handleOnClick={handleFriend} />}
                            </>
                                : <Button2 Icon={MdPersonAdd} text={'Thêm bạn'} colorIcon={'blue'} handleOnClick={handleFriend} />}
                            <Button2 Icon={GiShadowFollower} text={'Theo dõi'} colorIcon={'red'} isBorder={'border-l'} />
                        </div>}

                    </div>
                    <div className=' flex flex-1 flex-col justify-center items-end gap-3'>
                        <div className='relative'>
                            <img src={arrayBufferToBase64(userData?.avatar) || userData?.avatarUrl || avatarAnon} className='w-48 h-48 object-cover rounded-md' alt="avatar" />
                        </div>
                        <div className='icons flex gap-2 items-center justify-end'>
                            <ImFacebook2 size={18} color={'blue'} />
                            <BsInstagram size={18} color={'#E84A5A'} />
                            <IoLogoYoutube size={22} color={'#E84A5A'} />
                            <BsTwitter size={22} color={'#1DA1F2'} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-1000 mx-auto p-2 px-4 pr-6 bg-white pb-7 mt-4 rounded-md'>
                <div className='py-2 border-b flex items-center justify-between'>
                    <h2 className='text-xl font-medium '>
                        Thông tin cá nhân
                    </h2>
                    {userId === id && <Button text={'Chỉnh sửa'} bgColor={'bg-[#47BE2E]'} />}
                </div>
                {userData && <UserInfo userData={userData} />}
                <div className='py-2 border-b flex items-center justify-between'>
                    <div className='flex gap-2 items-center'>
                        <h2 className='text-xl font-medium '>
                            Bạn bè
                        </h2>
                        <span className='opacity-70'>{`(${userBonusParams?.friends ? JSON.parse(userBonusParams.friends).length : 0} người)`}</span>
                    </div>
                </div>
                <div className='py-4'>
                    List friends here
                </div>
            </div>

        </>
    )
}

export default Profile