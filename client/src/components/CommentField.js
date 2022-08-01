import React, { memo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import icons from '../ultils/icons'
import Button from './Button'
import { path } from '../ultils/constant'

const { TiArrowForward } = icons

const CommentField = ({ token, handleSaveComment, setIsReply, isReply, heightField, commentId, level, repliedName, repliedId, commentIdLv1 }) => {
    const [commentInput, setCommentInput] = useState(repliedName ? `@${repliedName}@ ` : '')

    // console.log(commentId);
    const handleCursorPostion = (e) => {
        e.target.setSelectionRange(commentInput.length + 1, commentInput.length + 1)
    }
    const handlePublic = () => {
        let commentIdFinal = level === 2 ? commentIdLv1 : commentId
        handleSaveComment(commentInput, commentIdFinal, level, repliedId)
        setCommentInput('')
        if (setIsReply) setIsReply(false)
    }

    return (
        <div>
            {token
                ? <>
                    <textarea
                        className={`w-full outline-none bg-gray-100 ${heightField} placeholder:text-sm placeholder:italic placeholder:opacity-90 p-2`}
                        placeholder='Type your comment here ...'
                        value={commentInput}
                        onChange={e => setCommentInput(e.target.value)}
                        autoFocus={level > 0 ? true : false}
                        onFocus={handleCursorPostion}
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
                            handleOnClick={handlePublic} />
                    </div>
                </>
                : <div className='mt-3 mb-7 flex gap-2 items-center'>
                    <span>Hãy đăng nhập nếu bạn muốn comment bài viết này.</span>
                    <Link to={path.LOGIN} className='text-[blue] hover:underline flex gap-2 items-center'>
                        <span>Đi tới đăng nhập</span>
                        <TiArrowForward size={18} color='blue' />
                    </Link>
                </div>}
        </div>
    )
}

export default memo(CommentField)