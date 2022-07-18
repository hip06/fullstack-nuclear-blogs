import React, { useState, memo, useEffect } from 'react'
import Button from '../../components/Button'
import { apiCreateComment, apiGetCommentsByPostId } from '../../services/commentService'
import { Link } from 'react-router-dom'
import { TiArrowForward } from 'react-icons/ti'
import { toast } from 'react-toastify'
import Comment from './Comment'

const Comments = ({ postId, token }) => {
    const [commentInput, setCommentInput] = useState('')
    const [updateComments, setUpdateComments] = useState(false)
    const [comments, setComments] = useState([])

    const handleSaveComment = async () => {
        let response = await apiCreateComment(
            { postId, content: commentInput },
            token
        )
        if (response?.data.err === 0) {
            setCommentInput('')
            setUpdateComments(prev => !prev)
        } else {
            toast.error('Hãy thử lại sau !')
        }
    }
    useEffect(() => {
        const fetchCommentsByPostId = async () => {
            let response = await apiGetCommentsByPostId(postId)
            if (response?.data.err === 0) {
                setComments(response.data?.commentData)
            }
        }
        fetchCommentsByPostId()
    }, [updateComments])
    return (
        <div className='w-full'>
            <h3 className='font-semibold pt-5 pb-2'>Comments</h3>
            {token
                ? <>
                    <textarea
                        className='w-full outline-none bg-gray-100 h-48 placeholder:text-sm placeholder:italic placeholder:opacity-90 p-2'
                        placeholder='Type your comment here ...'
                        value={commentInput}
                        onChange={e => setCommentInput(e.target.value)}
                    >
                    </textarea>
                    <div className='w-full flex justify-end items-center mt-3 mb-7'>
                        <Button text={'Public comment'} bgColor={'bg-[blue]'} handleOnClick={handleSaveComment} />
                    </div>
                </>
                : <div className='mt-3 mb-7 flex gap-2 items-center'>
                    <span>Hãy đăng nhập nếu bạn muốn comment bài viết này.</span>
                    <Link to={'/login'} className='text-[blue] hover:underline flex gap-2 items-center'>
                        <span>Đi tới đăng nhập</span>
                        <TiArrowForward size={18} color='blue' />
                    </Link>
                </div>}

            <div className='comment-section w-full'>
                {comments && comments.length > 0 && comments.map(item => {
                    return (
                        <div key={item.id} >
                            <Comment
                                commentator={item.commentator}
                                content={item?.content}
                                createdAt={item.createdAt}
                                updatedAt={item.updatedAt}
                            />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default memo(Comments)