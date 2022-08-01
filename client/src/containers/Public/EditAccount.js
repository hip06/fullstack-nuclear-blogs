import React, { useState } from 'react'
import avatarAnonymous from '../../assets/avatarAnonymous.jpg'
import { toBase64 } from '../../ultils/toBase64'
import { apiUpdateUser } from '../../services/userServices'
import { arrayBufferToBase64 } from '../../ultils/toBase64'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getOne } from '../../store/actions'
import { toast } from 'react-toastify'
import { path } from '../../ultils/constant'

// IMPORT COMPONENT
import EditTextField from '../../components/EditTextField'
import EditDateField from '../../components/EditDateField'


const EditAccount = ({ userData, token }) => {
    const [avatar, setAvatar] = useState(userData?.avatar || '')
    const [firstName, setFirstName] = useState(userData?.firstName ?? '')
    const [lastName, setLastName] = useState(userData?.lastName ?? '')
    const [birthday, setBirthday] = useState(userData?.birthday ?? 'none')
    const [description, setDescription] = useState(userData?.description ?? '')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSave = async () => {
        const payloadUpdate = { firstName, lastName, description, birthday, avatar }
        let response = await apiUpdateUser(token, payloadUpdate)
        if (response?.data.err === 0) {
            toast.success('Cập nhật thông tin cá nhân thành công !')
            dispatch(getOne(token))
            navigate(path.HOME)
        } else {
            toast.error(response?.data.msg)
        }
    }
    const handleChangeImage = async (e) => {
        let imgBase64 = await toBase64(e.target.files[0])
        setAvatar(imgBase64)
    }
    return (
        <div className='w-full bg-white h-full flex justify-between items-center flex-col '>
            <div className=' w-full h-full p-3'>
                <h1 className='font-bold text-xl text-center mb-5'>Chỉnh sửa thông tin cá nhân</h1>
                <div className='w-full flex justify-between my-3'>
                    <div className='flex items-center w-[95%]'>
                        <b className='flex-1'>Email:</b>
                        <div className='flex-5'>{userData?.email}</div>
                    </div>
                </div>
                <EditTextField data={lastName && lastName} setData={setLastName} title={'Họ'} />
                <EditTextField data={firstName} setData={setFirstName} title={'Tên'} />
                <EditDateField data={JSON.stringify(birthday)} setData={setBirthday} title={'Sinh nhật'} />
                <EditTextField data={description} setData={setDescription} title={'Mô tả bản thân'} type={'textarea'} />
                <div className='w-full flex justify-between my-3'>
                    <div className='flex gap-3 items-center'>
                        <b>Ảnh đại diện:</b>
                        <label htmlFor="upload-avatar">
                            <img src={arrayBufferToBase64(avatar) || (typeof avatar === 'object' ? false : avatar) || userData?.avatarUrl || avatarAnonymous} className='w-16 h-16 object-cover' alt="avatar" />
                        </label>
                        <input type="file" onChange={handleChangeImage} id="upload-avatar" hidden />
                    </div>
                </div>

            </div>
            <button
                type='button'
                className='px-6 py-2 my-2 rounded-md bg-[#228F80] opacity-90 hover:opacity-100 outline-none text-white'
                onClick={handleSave}
            >
                Lưu thay đổi
            </button>

        </div>
    )
}

export default EditAccount