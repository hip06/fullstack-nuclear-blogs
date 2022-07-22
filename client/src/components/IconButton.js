import React, { memo } from 'react'
import Tippy from '@tippyjs/react'

const IconButton = ({ Icon, title, handleOcClick, counter, isMine }) => {
    return (
        <button
            type='button'
            className='flex gap-1 items-center'
        >
            <Tippy content={title} >
                <div className={isMine ? 'p-1 bg-gray-200 rounded-full ' : 'p-2 hover:bg-gray-200 rounded-full '} onClick={handleOcClick} >
                    <Icon />
                </div>
            </Tippy>
            <span className='opacity-90'>{counter}</span>
        </button>


    )
}

export default memo(IconButton)