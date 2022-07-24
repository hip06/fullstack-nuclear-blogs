import React, { memo } from 'react'

const Button2 = ({ Icon, handleOnClick, text, colorIcon, isBorder }) => {
    return (
        <button
            type='button'
            className={`p-4 ${isBorder} hover:bg-gray-200 flex flex-col items-center`}
            onClick={handleOnClick}
        >
            <Icon size={18} color={colorIcon} />
            <span>{text}</span>
        </button>
    )
}

export default memo(Button2)