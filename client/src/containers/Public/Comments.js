import React, { useState, memo, useEffect, useCallback } from 'react'
import { path } from '../../ultils/constant'
import { apiCreateComment, apiGetCommentsByPostId } from '../../services/commentService'
import { toast } from 'react-toastify'
import Comment from './Comment'
import CommentField from '../../components/CommentField'

const Comments = ({ postId, token }) => {
    const [updateComments, setUpdateComments] = useState(false)
    const [comments, setComments] = useState([])


    const handleSaveComment = useCallback(async (commentInput, commentId, level, repliedId) => {
        let indexs = []
        commentInput.split('').forEach((item, index) => {
            if (item === '@') indexs.push(index)
        })
        let repliedName = indexs.length > 1 && `<a target="_blank" href="${path.PROFILE}/${repliedId}" ><b>${commentInput.slice(indexs[0], indexs[1])}</b></a>`
        let repliedContent = indexs.length > 1 ? commentInput.slice(indexs[1] + 1) : commentInput
        let response = await apiCreateComment(
            { postId, content: repliedName + repliedContent, parentId: commentId || null, level: level !== undefined ? level += 1 : 0 },
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
    }, [updateComments, postId])
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
                                comments={comments}
                                level={item.level}
                                counter={item.counter}
                                setUpdateComments={setUpdateComments}
                            />}
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default memo(Comments)