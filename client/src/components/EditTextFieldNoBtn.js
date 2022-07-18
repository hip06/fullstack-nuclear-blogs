import React, { useState } from 'react'

const EditTextFieldNoBtn = ({ label, value, setValue }) => {
    return (
        <div className='flex-1 flex items-center justify-center gap-3'>
            <label className='font-bold' htmlFor="">{label}:</label>
            <input
                type="text"
                className='p-2 w-full outline-none border-b border-slate-200 placeholder:italic placeholder:text-sm'
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={`${label} here`}
            />
        </div>
    )
}

export default EditTextFieldNoBtn