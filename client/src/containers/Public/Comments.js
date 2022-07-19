import React, { useState, memo, useEffect, useCallback } from 'react'

import { apiCreateComment, apiGetCommentsByPostId } from '../../services/commentService'
import { toast } from 'react-toastify'
import Comment from './Comment'
import CommentField from '../../components/CommentField'

const Comments = ({ postId, token }) => {
    const [updateComments, setUpdateComments] = useState(false)
    const [comments, setComments] = useState([])

    const handleSaveComment = useCallback(async (commentInput, commentId) => {
        let response = await apiCreateComment(
            { postId, content: commentInput, parentId: commentId || null },
            token
        )
        if (response?.data.err === 0) {
            setUpdateComments(prev => !prev)
        } else {
            toast.error('Hãy thử lại sau !')
        }
    }, [])
    useEffect(() => {
        const fetchCommentsByPostId = async () => {
            let response = await apiGetCommentsByPostId(postId)
            if (response?.data.err === 0) {
                setComments(response.data?.commentData)
            }
        }
        fetchCommentsByPostId()
    }, [updateComments])
    // console.log(comments);
    return (
        <div className='w-full'>
            <h3 className='font-semibold pt-5 pb-2'>Comments</h3>
            <CommentField
                handleSaveComment={handleSaveComment}
                token={token}
                heightField='h-48'
            />

            <div className='comment-section w-full'>
                {comments && comments.length > 0 && comments.map(item => {
                    return (
                        <div key={item.id} >
                            {!item.parentId && <Comment
                                commentId={item.id}
                                commentator={item.commentator}
                                content={item?.content}
                                createdAt={item.createdAt}
                                updatedAt={item.updatedAt}
                                token={token}
                                handleSaveComment={handleSaveComment}
                                parentComment={comments.filter(cmt => cmt.parentId === item.id)}
                            />}
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default memo(Comments)