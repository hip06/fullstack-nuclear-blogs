import React, { useState } from 'react'
import DatePicker from 'react-date-picker'
import moment from 'moment'

const styleBtn = 'flex h-[40px] px-6 justify-center items-center outline-none opacity-90 hover:opacity-100 text-white rounded-md'

const EditDateField = ({ data, title, setData }) => {
    let dataDate = JSON.parse(data) === 'none' ? new Date() : new Date(JSON.parse(data))
    const [currentFieldEdit, setCurrentFieldEdit] = useState(false)
    const handleSubmitField = () => {
        setCurrentFieldEdit(false)
    }
    return (
        <div className='w-full flex justify-between gap-3 my-3'>
            <div className='flex flex-5 gap-3 justify-start items-center'>
                <b className='flex-1'>{title}:</b>
                {currentFieldEdit
                    ? <div className='flex-5'>
                        <DatePicker
                            value={dataDate}
                            onChange={setData}
                            clearIcon={null}
                            maxDate={new Date()}
                        />
                    </div>
                    : <span className='flex-5'>{JSON.parse(data) === 'none' ? 'Chưa có' : moment(dataDate).format('DD/MM/YYYY')}</span>}
            </div>
            <button
                type='button'
                className={currentFieldEdit ? `${styleBtn} bg-[#dc3545]` : `${styleBtn} bg-[#47BE2E]`}
                onClick={() => currentFieldEdit ? handleSubmitField() : setCurrentFieldEdit(true)}
            >
                {currentFieldEdit ? 'Xác nhận' : 'Thay dổi'}
            </button>
        </div>
    )
}

export default EditDateField