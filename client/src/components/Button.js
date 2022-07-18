import React from 'react'

const Button = ({ bgColor, text, handleOnClick }) => {
    return (
        <button
            type='button'
            className={`outline-none px-6 py-2 text-white cursor-pointer opacity-90 hover:opacity-100 rounded-md ${bgColor}`}
            onClick={() => handleOnClick()}
        >
            {text}
        </button>
    )
}

export default Button