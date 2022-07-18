import React from 'react'

const SelectForm = ({ setValue, value, options, type, className }) => {
    return (
        <select
            className={`outline-none border p-2 border-slate-200 rounded-md ${className}`}
            onChange={e => setValue(e.target.value)}
            value={value}
        >
            <option value=''>{`-- Choose ${type} --`}</option>
            {options && options?.map(item => {
                return (
                    <option key={item.code} value={item.code}>{item.value}</option>
                )
            })}
        </select>
    )
}

export default SelectForm