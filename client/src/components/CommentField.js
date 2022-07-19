import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { TiArrowForward } from 'react-icons/ti'
import Button from './Button'

const CommentField = ({ token, handleSaveComment, setIsReply, isReply, heightField, commentId }) => {
    const [commentInput, setCommentInput] = useState('')

    return (
        <>
            {token
                ? <>
                    <textarea
                        className={`w-full outline-none bg-gray-100 ${heightField} placeholder:text-sm placeholder:italic placeholder:opacity-90 p-2`}
                        placeholder='Type your comment here ...'
                        value={commentInput}
                        onChange={e => setCommentInput(e.target.value)}
                    >
                    </textarea>
                    <div className='w-full flex justify-end gap-3 items-center mt-3 mb-7'>
                        {isReply && <Button
                            text={'Cancel'}
                            bgColor={'bg-[#E47F37]'}
                            handleOnClick={() => {
                                setIsReply(false)
                                setCommentInput('')
                            }} />}
                        <Button
                            text={'Public comment'}
                            bgColor={'bg-[blue]'}
                            handleOnClick={() => {
                                handleSaveComment(commentInput, commentId)
                                setCommentInput('')
                                setIsReply(false)
                            }} />

                    </div>
                </>
                : <div className='mt-3 mb-7 flex gap-2 items-center'>
                    <span>Hãy đăng nhập nếu bạn muốn comment bài viết này.</span>
                    <Link to={'/login'} className='text-[blue] hover:underline flex gap-2 items-center'>
                        <span>Đi tới đăng nhập</span>
                        <TiArrowForward size={18} color='blue' />
                    </Link>
                </div>}
        </>
    )
}

export default memo(CommentField)