import React, { useState } from 'react'

const styleBtn = 'flex flex-6 h-[40px] px-6 justify-center items-center outline-none opacity-90 hover:opacity-100 text-white rounded-md'

const EditTextField = ({ title, data, setData, type }) => {
    const align = type === 'textarea' ? 'items-start mt-5' : 'items-center'
    const [currentFieldEdit, setCurrentFieldEdit] = useState(false)
    const [valueInput, setValueInput] = useState(data)
    const handleSubmitField = () => {
        setData(valueInput)
        setCurrentFieldEdit(false)
    }
    return (

        <div className={`w-full flex justify-between gap-3 my-3 ${align}`}>
            <div className='flex flex-1 gap-3 justify-start'>
                <b className='flex-1'>{title}:</b>
                {currentFieldEdit
                    ? type === 'textarea'
                        ? <textarea
                            className='flex-5 w-full outline-none bg-gray-100 p-2 rounded-md'
                            value={valueInput}
                            onChange={e => setValueInput(e.target.value)}
                            rows={6}
                        >
                        </textarea>
                        : <input
                            type="text"
                            className='flex-5 w-full outline-none bg-gray-100 p-2 rounded-md'
                            value={valueInput}
                            onChange={e => setValueInput(e.target.value)}
                        />
                    : <div className='flex-5 w-full flex-wrap whitespace-normal'>{data || 'Chưa có'}</div>}
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

export default EditTextField