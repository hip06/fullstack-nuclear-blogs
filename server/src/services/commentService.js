import db from '../models'
import { v4 as uuidv4 } from 'uuid';

// CREATE A COMMENT
export const createCommentService = (body, userId) => new Promise(async (resolve, reject) => {
    try {
        let response = await db.Comment.create({
            ...body, userId, id: uuidv4()
        })
        resolve({ err: 0, msg: 'Create comment done !', commentData: response })
    } catch (error) {
        reject(error)
    }
})
// GET ALL COMMENT BY POST (PUBLIC)
export const getCommentsByPostIdService = (postId) => new Promise(async (resolve, reject) => {
    try {
        let response = await db.Comment.findAll({
            where: { postId },
            raw: true,
            nest: true,
            order: [['createdAt', 'DESC']],
            include: [
                { model: db.User, attributes: ['firstName', 'lastName', 'avatar', 'avatarUrl'], as: 'commentator' }
            ]
        })
        response ? resolve({ err: 0, msg: 'Get comments done !', commentData: response }) : resolve({ err: 1, msg: 'Cant get comments !', })
    } catch (error) {
        reject(error)
    }
})
// UPDATE COMMENT BY USERID & POSTID & PARENTID

// DELETE COMMENT BY USERID & POSTID & PARENTID

// LIKE COMMENT (PUBLIC)
export const updateLikeCommentService = (body) => new Promise(async (resolve, reject) => {
    try {
        if (body.type === 1) {
            await db.Comment.update({
                like: body.like
            }, {
                id: body.commentId,
                postId: body.postId
            })
        } else if (body.type === 0) {
            await db.Comment.update({
                dislike: body.dislike
            }, {
                id: body.commentId,
                postId: body.postId
            })
        }
        resolve({ err: 0, msg: 'OK !' })
    } catch (error) {
        reject(error)
    }
})