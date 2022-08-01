import React, { memo } from 'react'
import icons from '../ultils/icons'
import randomColor from '../ultils/randomColor'
import { bgColor2 } from '../ultils/constant'

const { AiFillTag, MdOutlineClose } = icons

const TagName = ({ tag, clear, handleOnclick }) => {
    const bgColor = randomColor(bgColor2)
    const handleClick = (e) => {
        e.stopPropagation()
        handleOnclick(tag)
    }
    return (
        <div onClick={handleClick} className={`flex justify-center gap-2 items-center font-normal text-base border rounded-md p-2 ${bgColor} text-white opacity-90 hover:opacity-100`}>
            <AiFillTag size={20} />
            {tag}
            {clear && <div className='cursor-pointer' onClick={() => clear(tag)}>
                <MdOutlineClose size={20} color='white' />
            </div>}
        </div>
    )
}

export default memo(TagName)