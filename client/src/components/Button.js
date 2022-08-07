import React, { memo } from 'react'

const Button = ({ bgColor, text, handleOnClick, IcBefore }) => {
    return (
        <button
            type='button'
            className={`outline-none p-2 px-4 text-white cursor-pointer opacity-90 hover:opacity-100 rounded-md ${bgColor} flex items-center justify-center gap-1`}
            onClick={() => handleOnClick()}
        >
            {IcBefore && <IcBefore color='white' size={20} />}
            {text}
        </button>
    )
}

export default memo(Button)