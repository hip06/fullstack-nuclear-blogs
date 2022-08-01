import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiGetAllUser, apiDeleteUser } from '../../services/userServices'
import moment from 'moment'
import Scrollbars from 'react-custom-scrollbars-2'
import icons from '../../ultils/icons'
import { toast } from 'react-toastify'

// IMPORT COMPONENT
import EditAccountByAdmin from './EditAccountByAdmin'
import Modal from '../../components/Modal'

const { RiUserFill, MdStars, BsSearch, CgDanger } = icons

const ManageUser = ({ token }) => {

    const [allUser, setAllUser] = useState([])
    const [allUserStatic, setAllUserStatic] = useState([])
    const [dataEdit, setDataEdit] = useState('')
    const [updateUI, setUpdateUI] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const [isShowSearch, setIsShowSearch] = useState(false)
    const [keyword, setKeyword] = useState('')


    useEffect(() => {
        const fetchAllUser = async () => {
            let response = await apiGetAllUser(token)
            // console.log(response);
            if (response && response?.data.err === 0) {
                setAllUser(response.data.response)
                setAllUserStatic(response.data.response)
            }
        }
        if (token) {
            fetchAllUser()
        }
        return () => {
            setDataEdit('')
        }
    }, [updateUI])
    const handleEdit = (user) => {
        setDataEdit(user)
    }
    const handleDelete = async (selectedId) => {
        let response = await apiDeleteUser(token, selectedId)
        if (response?.data.err === 0) {
            setUpdateUI(prev => !prev)
            toast.success(`Delete done userId: ${selectedId} !`)
        } else {
            toast.error(response?.data.msg)
        }
        setIsShowModal(false)
        setSelectedId(null)
    }
    useEffect(() => {
        if (keyword.trim() !== '') {
            let filtedUsers = allUser.filter(u => u?.email?.indexOf(keyword) !== -1 || u?.firstName?.indexOf(keyword) !== -1 || u?.lastName?.indexOf(keyword) !== -1)
            setAllUser(filtedUsers)
        } else {
            setAllUser(allUserStatic)
        }
    }, [keyword])

    return (
        <>
            <div className='w-full h-full bg-gray-100 p-2 flex justify-center items-center lg:block pt-0'>
                <div className='lg:hidden w-4/5 h-4/5  bg-white rounded-md flex flex-col gap-5 justify-center items-center shadow-md'>
                    <CgDanger size={30} />
                    Require devices whose width is more than 1024px
                </div>
                <div className='lg:flex hidden gap-3 justify-between items-center'>
                    <div className='flex gap-5 flex-start items-center'>
                        <h1 className='font-bold text-[#dc3545] text-xl px-4 text-center bg-white rounded-md py-5 my-3 shadow-md'>Quản lý danh sách người dùng</h1>
                        <div className='gap-px text-[#47BE2E] text-xl flex py-5 px-4 items-center justify-center bg-white rounded-md shadow-md'>
                            {`Total: ${allUser.length}`} <RiUserFill />
                        </div>
                        <div className='flex gap-px text-[#E47F37] text-xl py-5 px-4 items-center justify-center bg-white rounded-md shadow-md'>
                            {`Admins: ${allUser.length > 0 ? allUser.filter(u => u.roleCode === 'ADMIN').length : 0}`} <RiUserFill />
                        </div>
                        <div className='flex gap-px text-[#dc3545] text-xl py-5 px-4 items-center justify-center bg-white rounded-md shadow-md'>
                            {`Creators: ${allUser.length > 0 ? allUser.filter(u => u.roleCode === 'CRE').length : 0}`} <RiUserFill />
                        </div>
                        <div className='flex gap-px text-[#228F80] text-xl py-5 px-4 items-center justify-center bg-white rounded-md shadow-md'>
                            {`Users: ${allUser.length > 0 ? allUser.filter(u => u.roleCode === 'USER').length : 0}`} <RiUserFill />
                        </div>
                    </div>
                    <div className='flex gap-2 mr-3 justify-end items-center py-3'>
                        {isShowSearch && <input
                            type="text"
                            className='px-2 py-1 w-4/5 outline-none border-b bg-transparent border-[#E47F37] animate-scale-up-hor-right placeholder:italic placeholder:text-sm placeholder:text-gray-700'
                            placeholder='Wanna search a user?'
                            value={keyword}
                            onChange={e => setKeyword(e.target.value)}
                        />}
                        <div className='flex gap-px py-3 px-4 items-center justify-center bg-white rounded-md shadow-md'>
                            <div onClick={() => setIsShowSearch(prev => !prev)} className='p-2 hover:bg-[#dc3545] hover:text-white hover:rounded-full cursor-pointer'>
                                <BsSearch size={25} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full relative lg:block hidden bg-white rounded-md overflow-hidden'>
                    <Scrollbars style={{ width: '100%', height: '84vh' }}>
                        <table className="border-collapse w-full table-auto">
                            <thead>
                                <tr className='h-[64px] bg-[#228F80]'>
                                    <th className="">UserId</th>
                                    <th className="">Email</th>
                                    <th className="">Họ</th>
                                    <th className="">Tên</th>
                                    <th className="">Sinh nhật</th>
                                    <th className="">Chức danh</th>
                                    <th className="">Role</th>
                                    <th className="">Star</th>
                                    <th className="">Created At</th>
                                    <th className="">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUser && allUser.length > 0 && allUser.map((item, index) => {
                                    return (
                                        <tr key={item.id} className={index % 2 === 0 ? 'h-[32px] bg-slate-200' : 'h-[32px]'}>
                                            <td className="px-2">{item.id}</td>
                                            <td className="px-2">{item.email}</td>
                                            <td className="text-center px-2">{item.lastName}</td>
                                            <td className="text-center px-2">{item.firstName}</td>
                                            <td className="text-center px-2">{moment(item.birthday).format('DD/MM/YYYY')}</td>
                                            <td className="text-center px-2">{item?.Position?.value}</td>
                                            <td className="text-center px-2">{item?.Role?.value}</td>
                                            <td className="text-center px-2 flex gap-px items-center justify-center">{item.star}<MdStars size={15} color={'#803815'} /></td>
                                            <td className="">{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                                            <td className="flex gap-2 justify-center items-center h-[50px]">
                                                <button
                                                    type='button'
                                                    className='py-1 px-4 outline-none bg-[#47BE2E] rounded-md text-white'
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type='button'
                                                    className='py-1 px-4 outline-none bg-[#dc3545] rounded-md text-white'
                                                    onClick={() => {
                                                        setSelectedId(item.id)
                                                        setIsShowModal(true)
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {allUser && allUser.length === 0 && <tr><td>No data</td></tr>}
                            </tbody>
                        </table>
                    </Scrollbars>
                    {dataEdit && <div className='absolute top-0 left-0 right-0 bottom-0 bg-white shadow-md rounded-md animate-scale-up-center'>
                        <EditAccountByAdmin dataEdit={dataEdit} token={token} setDataEdit={setDataEdit} setUpdateUI={setUpdateUI} />
                    </div>}
                </div>
            </div >
            {isShowModal && <Modal
                btn={true}
                content={`Are u sure you wanna delete the user with id: ${selectedId}?`}
                title={'Warn'}
                handleConfirm={() => handleDelete(selectedId)}
                handleDecline={() => {
                    setIsShowModal(false)
                    setSelectedId(null)
                }}
            />}
        </>
    )
}

export default ManageUser