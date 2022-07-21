import React, { memo } from 'react'
import Tippy from '@tippyjs/react'

const Icon = ({ Icon, title }) => {
    return (

        <Tippy content={title} >
            <div className='p-2 hover:bg-gray-200 rounded-full ' >
                <Icon />
            </div>
        </Tippy>

    )
}

export default memo(Icon)