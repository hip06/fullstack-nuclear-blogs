import React, { memo } from 'react'
import moment from 'moment';
import { arrayBufferToBase64 } from '../../ultils/toBase64'

const Comment = ({ commentator, content, createdAt, updatedAt }) => {

    console.log({ commentator, content, createdAt, updatedAt });

    return (
        <div className='flex w-full gap-2 justify-start items-center my-5'>
            <img
                src={arrayBufferToBase64(commentator?.avatar) || commentator.avatarUrl}
                alt="avatar"
                className='w-12 h-12 rounded-full object-cover'
            />
            <div className='flex flex-col justify-start'>
                <div className='flex gap-2 items-center'>
                    <h4 className='font-medium'>{`${commentator?.lastName} ${commentator?.firstName}`}</h4>
                    <small>{`(${moment(createdAt).fromNow()})`}</small>
                </div>
                <p className='text-justify'>{content}</p>
            </div>

        </div>
    )
}

export default memo(Comment)