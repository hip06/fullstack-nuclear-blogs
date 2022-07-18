import React, { useState, useEffect } from 'react'
import EditTextFieldNoBtn from '../../components/EditTextFieldNoBtn'
import DatePicker from 'react-date-picker'
import { apiGetRole, apiGetPosition } from '../../services/appService'
import Button from '../../components/Button'
import SelectForm from '../../components/SelectForm'
import avatarAnonymous from '../../assets/avatarAnonymous.jpg'
import { arrayBufferToBase64, toBase64 } from '../../ultils/toBase64'
import { apiUpdateUserByAdmin } from '../../services/userServices'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const EditAccountByAdmin = ({ dataEdit, setDataEdit, setUpdateUI }) => {

    const [roles, setRoles] = useState([])
    const [positions, setPositions] = useState([])
    const [firstName, setFirstName] = useState(dataEdit?.firstName || '')
    const [lastName, setLastName] = useState(dataEdit?.lastName || '')
    const [birthday, setBirthday] = useState(dataEdit?.birthday || new Date())
    const [positionCode, setPositionCode] = useState(dataEdit?.positionCode || '')
    const [roleCode, setRoleCode] = useState(dataEdit?.roleCode || '')
    const [star, setStar] = useState(dataEdit?.star)
    const [avatar, setAvatar] = useState(dataEdit?.avatar || '')
    const { token } = useSelector(state => state.user.currentLoggendIn)


    useEffect(() => {
        const fetchRoleAndPosition = async () => {
            //api here
            let [roles, positions] = await Promise.all([apiGetRole(), apiGetPosition()])
            if (roles?.data?.err === 0) {
                setRoles(roles.data?.response)
            } else {
                console.log(roles);
            }
            if (positions?.data?.err === 0) {
                setPositions(positions.data?.response)
            } else {
                console.log(positions);
            }
        }
        fetchRoleAndPosition()
        return () => {
            setUpdateUI(prev => !prev)
        }
    }, [])
    const handleUpdate = async () => {
        if (token) {
            let response = await apiUpdateUserByAdmin(token, {
                id: dataEdit?.id,
                firstName,
                lastName,
                star,
                roleCode,
                positionCode,
                birthday,
                avatar: typeof avatar === 'object' ? arrayBufferToBase64(avatar) : avatar
            })
            if (response?.data.err === 0) {
                setDataEdit('')
                toast.success('Update done !')
            } else {
                toast.error(response?.data.msg)
            }
        }
    }
    const hideEditBox = () => setDataEdit('')
    const handleChandeFile = async (e) => {
        let { type } = e.target.files[0]
        if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
            let fileBase64 = await toBase64(e.target.files[0])
            setAvatar(fileBase64)
        }
    }
    return (
        <div className='w-full h-full pb-3 px-2 flex flex-col justify-between' >
            <div className='w-full'>
                <h1 className='text-center py-5 font-bold text-xl text-[#228F80]'>
                    {`Editing information of ${dataEdit.email}`}
                </h1>
                <div className='w-full flex flex-wrap flex-col md:flex-row justify-between gap-5 mb-7 my-5 items-center'>
                    <EditTextFieldNoBtn value={lastName} label={'Lastname'} setValue={setLastName} />
                    <EditTextFieldNoBtn value={firstName} label={'Firstname'} setValue={setFirstName} />
                </div>
                <div className='w-full flex flex-wrap flex-col md:flex-row justify-between my-5 mb-7 gap-5 items-center'>
                    <div className='flex-2'>
                        <EditTextFieldNoBtn value={star} label={'Star'} setValue={setStar} />
                    </div>
                    <div className='flex-1 flex gap-3 justify-center items-center'>
                        <label htmlFor="" className='font-bold flex-2' >Position:</label>
                        <SelectForm type={'position'} value={positionCode} setValue={setPositionCode} options={positions} />
                    </div>
                    <div className='flex-1 flex gap-3 justify-center items-center'>
                        <label htmlFor="" className='font-bold flex-2' >Role:</label>
                        <SelectForm type={'role'} value={roleCode} setValue={setRoleCode} options={roles} />
                    </div>
                </div>
                <div className='w-full flex flex-wrap flex-col md:flex-row justify-between gap-7 my-5 items-start'>
                    <div className='flex justify-start flex-1 gap-3 items-center'>
                        <label className='font-bold flex-2' htmlFor="">
                            Birthday:
                        </label>
                        <DatePicker
                            clearIcon={null}
                            maxDate={new Date()}
                            value={birthday}
                            onChange={setBirthday}
                            showLeadingZeros={true}
                        />
                    </div>
                    <div className='flex justify-start flex-1 gap-3 items-start'>
                        <label htmlFor="avatar" className='font-bold flex-2' >
                            Avatar:
                            <img
                                src={arrayBufferToBase64(avatar) || (typeof avatar === 'object' ? false : avatar) || dataEdit?.avatarUrl || avatarAnonymous}
                                className='w-32 h-32 object-cover mt-3 cursor-pointer'
                                alt="avatar"
                                referrerPolicy="no-referrer"
                            />
                            <small className='text-gray-300 text-sm italic font-normal'>Only support images whose type is PNG, JPG, JPEG</small>
                        </label>
                        <input type="file" hidden onChange={handleChandeFile} id="avatar" />
                    </div>
                </div>
            </div>
            <div className='btns flex justify-end items-center gap-5'>
                <Button bgColor={'bg-[#228F80]'} text={'Confirm'} handleOnClick={handleUpdate} />
                <Button bgColor={'bg-[#dc3545]'} text={'Back'} handleOnClick={hideEditBox} />
            </div>
        </div>
    )
}

export default EditAccountByAdmin