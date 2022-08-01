import React, { memo, useState, useEffect, useRef, useCallback } from 'react'
import moment from 'moment';
import { arrayBufferToBase64 } from '../../ultils/toBase64'
import icons from '../../ultils/icons';
import { apiUpdateLikeComment, apiUpdateDislikeComment } from '../../services/commentService'
import IconButton from '../../components/IconButton'
import CommentField from '../../components/CommentField';
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import { useSelector } from 'react-redux'
import avatarAnonymous from '../../assets/avatarAnonymous.jpg'

const { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike, AiFillCaretDown, AiFillCaretUp } = icons
const styleComment = 'container-comment relative flex w-full gap-2 justify-start items-start my-5 '
// reply 3 end !!
const Comment = ({ commentator, content, createdAt, counter, comments, token, commentId, handleSaveComment, parentComment, level, commentIdLv1, setUpdateComments }) => {
    const [isReply, setIsReply] = useState(false)
    const [isShowReply, setIsShowReply] = useState(false)
    const textFieldRef = useRef()
    const userData = useSelector(state => state.user.userData)
    useEffect(() => {
        if (isReply) textFieldRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, [isReply])
    const handleLikeComment = useCallback(async () => {
        let response = await apiUpdateLikeComment({ commentId }, token)
        if (response?.data.err === 0) setUpdateComments(prev => !prev)
    }, [])
    const handleDislikeComment = useCallback(async () => {
        let response = await apiUpdateDislikeComment({ commentId }, token)
        if (response?.data.err === 0) setUpdateComments(prev => !prev)
    }, [])
    return (
        <div className={level === 0 ? styleComment + 'border-b pb-5' : styleComment}>
            <div className='flex flex-col w-16 justify-start items-center'>
                <img
                    src={arrayBufferToBase64(commentator?.avatar) || commentator.avatarUrl || avatarAnonymous}
                    alt="avatar"
                    className='w-12 h-12 rounded-full object-cover'
                    id={commentId}
                />
            </div>
            <div className='flex flex-col justify-start w-full'>
                <div className='flex gap-2 items-center'>
                    <h4 className='font-medium'>{commentator?.lastName && commentator?.firstName ? `${commentator?.lastName} ${commentator?.firstName}` : 'Chưa có tên'}</h4>
                    <small>{`(${moment(createdAt).fromNow()})`}</small>
                </div>
                <ReactMarkdown
                    className='mdContent'
                    children={content}
                    rehypePlugins={[rehypeRaw]}
                />
                <div className='w-full flex gap-2 items-center'>
                    {JSON.parse(counter.like)?.some(userId => userId === userData?.id)
                        ? <IconButton isMine={true} title={'Bỏ thích'} Icon={AiFillLike} handleOcClick={handleLikeComment} counter={JSON.parse(counter.like)?.length} />
                        : <IconButton title={'Thích'} Icon={AiOutlineLike} handleOcClick={handleLikeComment} counter={JSON.parse(counter.like)?.length} />}
                    {JSON.parse(counter.dislike)?.some(userId => userId === userData?.id)
                        ? <IconButton isMine={true} title={'Bỏ phẫn nộ'} Icon={AiFillDislike} handleOcClick={handleDislikeComment} counter={JSON.parse(counter.dislike)?.length} />
                        : <IconButton title={'Phẫn nộ'} Icon={AiOutlineDislike} handleOcClick={handleDislikeComment} counter={JSON.parse(counter.dislike)?.length} />}
                    <button
                        type='button'
                        className='px-2 hover:opacity-100 opacity-90'
                        onClick={() => setIsReply(true)}
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
                                        commentIdLv1={level === 1 && commentId}
                                        level={item.level}
                                        counter={item.counter}
                                        setUpdateComments={setUpdateComments}
                                    />
                                </div>
                            )
                        })}
                    </>}
                </div>}
                {isReply && <div ref={textFieldRef} className='reply w-full mt-3'>
                    <CommentField
                        setIsReply={setIsReply}
                        token={token}
                        isReply={true}
                        heightField='h-20'
                        commentId={commentId}
                        handleSaveComment={handleSaveComment}
                        repliedName={`${commentator?.lastName} ${commentator?.firstName}`}
                        repliedId={commentator?.id}
                        commentIdLv1={commentIdLv1 && commentIdLv1}
                        level={level}
                    />
                </div>}
            </div>

        </div >
    )
}

export default memo(Comment)