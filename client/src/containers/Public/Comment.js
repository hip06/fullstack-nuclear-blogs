import React, { memo, useState } from 'react'
import moment from 'moment';
import { arrayBufferToBase64 } from '../../ultils/toBase64'
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { apiUpdateLikeComment } from '../../services/commentService'
import Tippy from '@tippyjs/react';
import CommentField from '../../components/CommentField';
import Xarrow from "react-xarrows";


const Comment = ({ commentator, content, createdAt, comments, token, commentId, handleSaveComment, parentComment, level }) => {
    const [isReply, setIsReply] = useState(false)
    const [isShowReply, setIsShowReply] = useState(false)
    const [updateXarrow, setUpdateXarrow] = useState(true)
    const handleLikeComment = () => {

    }
    const handleDislikeComment = () => {

    }
    // console.log(updateXarrow);
    // draw curve
    return (
        <div className='container-comment relative flex w-full gap-2 justify-start items-start my-5'>
            <div className='flex flex-col w-16 justify-start items-center'>
                <img
                    src={arrayBufferToBase64(commentator?.avatar) || commentator.avatarUrl}
                    alt="avatar"
                    className='w-12 h-12 rounded-full object-cover'
                    id={commentId}
                />
                {isShowReply && parentComment?.length > 0 && parentComment.map(item => {
                    return (
                        <div key={item.id}>
                            <Xarrow
                                startAnchor={'bottom'}
                                start={commentId}
                                end={item.id}
                                strokeWidth={0.5}
                                showHead={false}
                                endAnchor={'left'}
                                path={'grid'}
                            />
                        </div>
                    )
                })}
            </div>
            <div className='flex flex-col justify-start w-full'>
                <div className='flex gap-2 items-center'>
                    <h4 className='font-medium'>{`${commentator?.lastName} ${commentator?.firstName}`}</h4>
                    <small>{`(${moment(createdAt).fromNow()})`}</small>
                </div>
                <p className='text-justify'>{content}</p>
                <div className='w-full flex gap-2 items-center'>
                    <button
                        type='button'
                        className='flex gap-1 items-center'
                    >
                        <Tippy content='Like' >
                            <div className='p-2 hover:bg-gray-200 rounded-full' onClick={handleLikeComment} >
                                <AiOutlineLike />
                            </div>
                        </Tippy>
                        <span className='opacity-90'>10</span>
                    </button>
                    <button
                        type='button'
                        className='flex gap-1 items-center'
                    >
                        <Tippy content='Dislike' >
                            <div className='p-2 hover:bg-gray-200 rounded-full ' onClick={handleDislikeComment} >
                                <AiOutlineDislike />
                            </div>
                        </Tippy>
                        <span className='opacity-90'>1</span>
                    </button>
                    <button
                        type='button'
                        className='p-2 hover:opacity-100 opacity-90'
                        onClick={() => {
                            setIsReply(true)
                            if (level > 0) {
                                setUpdateXarrow(false)
                            }
                        }}
                    >
                        Phản hồi
                    </button>
                </div>
                {<div className='comment-sub-section w-full'>
                    {parentComment && parentComment.length > 0 && <div
                        className='font-medium text-[blue] opacity-90 hover:opacity-100 cursor-pointer'
                        onClick={() => setIsShowReply(prev => !prev)}
                    >
                        {isShowReply
                            ? <div className='flex items-center gap-2 '>
                                <AiFillCaretUp size={16} />
                                {`Ẩn phản hồi`}
                            </div>
                            : <div className='flex items-center gap-2 '>
                                <AiFillCaretDown size={16} />
                                {`Xem phản hồi`}
                            </div>}
                    </div>}
                    {isShowReply && <>
                        {parentComment && parentComment.length > 0 && parentComment.map(item => {
                            return (
                                <div key={item.id} >
                                    <Comment
                                        commentId={item.id}
                                        commentator={item.commentator}
                                        content={item?.content}
                                        createdAt={item.createdAt}
                                        updatedAt={item.updatedAt}
                                        token={token}
                                        handleSaveComment={handleSaveComment}
                                        parentComment={comments?.filter(cmt => cmt.parentId === item.id)}
                                        comments={comments}
                                        level={item.level}
                                        setUpdateXarrow={setUpdateXarrow}
                                    />
                                </div>
                            )
                        })}
                    </>}
                </div>}
                {isReply && <div className='reply w-full mt-3'>
                    <CommentField
                        setIsReply={setIsReply}
                        token={token}
                        isReply={true}
                        heightField='h-20'
                        commentId={commentId}
                        handleSaveComment={handleSaveComment}
                        level={level}
                    />
                </div>}
            </div>

        </div>
    )
}

export default memo(Comment)