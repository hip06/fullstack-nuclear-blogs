import React, { memo, useState } from 'react'
import moment from 'moment';
import { arrayBufferToBase64 } from '../../ultils/toBase64'
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { apiUpdateLikeComment } from '../../services/commentService'
import Tippy from '@tippyjs/react';
import CommentField from '../../components/CommentField';
import { BasisCurve } from 'react-svg-curve';


const Comment = ({ commentator, content, createdAt, updatedAt, token, commentId, handleSaveComment, parentComment }) => {
    const [isReply, setIsReply] = useState(false)

    const handleLikeComment = () => {

    }
    const handleDislikeComment = () => {

    }
    // console.log(parentComment);
    // draw curve
    return (
        <div className='container-comment relative flex w-full gap-2 justify-start items-start my-5'>
            <div className='flex flex-col w-16 justify-start items-center'>
                <img
                    src={arrayBufferToBase64(commentator?.avatar) || commentator.avatarUrl}
                    alt="avatar"
                    className='w-12 h-12 rounded-full object-cover'
                />
                {/* <svg height={'100%'} width={'100%'} >
                    <path d="M 30 0 L 30 135 C 60 135, 60 135, 50 10" stroke="black" fill="transparent" />
                </svg> */}
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
                        className='text-[blue] p-2 hover:text-red'
                        onClick={() => setIsReply(true)}
                    >
                        Phản hồi
                    </button>
                </div>
                {isReply && <div className='reply w-full mt-3'>
                    <CommentField
                        setIsReply={setIsReply}
                        token={token} isReply={true}
                        heightField='h-20'
                        commentId={commentId}
                        handleSaveComment={handleSaveComment}
                    />
                </div>}
                <div className='comment-section w-full'>
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
                                    parentComment={parentComment.filter(cmt => cmt.parentId === item.id)}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default memo(Comment)