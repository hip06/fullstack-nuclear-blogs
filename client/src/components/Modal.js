import React from 'react'
import Button from './Button'

const Modal = ({ btn, content, title, handleConfirm, handleDecline }) => {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-blackOverlay flex justify-center items-center'>
            <div className='bg-white rounded-md rounded-t-lg w-4/5 md:w-2/3 lg:w-1/2 flex flex-col animate-scale-up-center shadow-md'>
                <div className='bg-[#E47F37] w-full px-2 py-5 text-xl text-white font-bold rounded-t-md'>
                    {title}
                </div>
                <div className='p-2'>
                    <div className=''>
                        {content}
                    </div>
                    {btn && <div className='flex gap-3 justify-end items-center mt-5'>
                        <Button bgColor={'bg-[#47BE2E]'} text={'Confirm'} handleOnClick={handleConfirm} />
                        <Button bgColor={'bg-[#dc3545]'} text={'Decline'} handleOnClick={handleDecline} />
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Modal