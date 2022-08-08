import React, { useState } from 'react'
import icons from '../ultils/icons'

const { FaBell } = icons
const Notification = ({ counter, handleClick }) => {
    const [isShowNotice, setIsShowNotice] = useState(false)
    return (
        <div onClick={() => setIsShowNotice(prev => !prev)} className='flex items-center relative cursor-pointer'>
            <FaBell size={24} />
            <div className='absolute top-0 right-0 bg-red text-[10px] p-1 w-4 h-4 flex items-center justify-center rounded-full text-white'>
                {counter}
            </div>
            {isShowNotice && <div className='absolute top-full right-0 bg-[#333333] text-white w-[350px] z-30 rounded-md'>
                <h4 className='p-2 pb-3 text-base font-medium'>
                    Thông báo
                </h4>
                <div className='text-sm hover:bg-gray-500 cursor-pointer p-2' >
                    Notice that there is no need to wrap Sequelize calls with Promise becasue Sequelize already returns promises. This way you only need to have one
                </div>
                <div className='text-sm hover:bg-gray-500 cursor-pointer p-2' >
                    Notice that there is no need to wrap Sequelize calls with Promise becasue Sequelize already returns promises. This way you only need to have one
                </div>
                <div className='text-sm hover:bg-gray-500 cursor-pointer p-2' >
                    Notice that there is no need to wrap Sequelize calls with Promise becasue Sequelize already returns promises. This way you only need to have one
                </div>
                <small className='w-full flex justify-center items-center py-2 cursor-pointer hover:bg-gray-500 border-t border-1'>
                    Xoa thong baos
                </small>
            </div>}
        </div>
    )
}

export default Notification