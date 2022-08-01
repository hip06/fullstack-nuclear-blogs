import React from 'react'
import { EditTextField, Button } from '../../components'

const AccountEdit = ({ setIsEdit }) => {
    return (
        <div className='w-full min-h-1000 mx-auto p-2 mr-2 bg-white pb-7 rounded-md absolute top-0 left-0 z-20'>
            <h2 className='text-2xl font-semibold w-full text-center py-5'>Chỉnh sửa thông tin cá nhân</h2>
            <div>
                <EditTextField />
            </div>
            <div>
                <Button text={'Quay lại'} />
            </div>
        </div>
    )
}

export default AccountEdit