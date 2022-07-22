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
            order: [['createdAt', 'ASC']],
            include: [
                { model: db.User, attributes: ['id', 'firstName', 'lastName', 'avatar', 'avatarUrl'], as: 'commentator' },
                { model: db.Likecmt, attributes: ['like', 'dislike'], as: 'counter' }
            ]
        })
        response ? resolve({ err: 0, msg: 'Get comments done !', commentData: response }) : resolve({ err: 1, msg: 'Cant get comments !', })
    } catch (error) {
        reject(error)
    }
})
// UPDATE COMMENT BY USERID & POSTID & PARENTID

// DELETE COMMENT BY USERID & POSTID & PARENTID

// LIKE COMMENT
export const updateLikeCommentService = (body, likerId) => new Promise(async (resolve, reject) => {
    try {
        let response = await db.Likecmt.findOrCreate({
            where: { commentId: body.commentId },
            defaults: {
                commentId: body.commentId,
                like: JSON.stringify([likerId])
            },
            raw: true
        })
        // KIỂM TRA XEM USERID NÀY ĐÃ THÍCH CHƯA => NẾU CHƯA THÌ ADD, NẾU RỒI THÌ XÓA
        if (!response[1]) {
            let likers = response[0].like ? JSON.parse(response[0].like) : [] // CONVERT STRING TO ARRAY
            let liker = likers.find(item => item === likerId) // TÌM USERID NÀY ĐÃ CÓ TRONG MẢNG CHƯA
            let like = liker ? JSON.stringify(likers.filter(item => item !== liker)) : JSON.stringify([...likers, likerId])
            await db.Likecmt.update({ like }, {
                where: { commentId: body.commentId }
            })
        }
        resolve({ err: 0, msg: 'OK !' })

    } catch (error) {
        reject(error)
    }
})
// DISLIKE COMMENT
export const updateDislikeCommentService = (body, dislikerId) => new Promise(async (resolve, reject) => {
    try {
        let response = await db.Likecmt.findOrCreate({
            where: { commentId: body.commentId },
            defaults: {
                commentId: body.commentId,
                dislike: JSON.stringify([dislikerId])
            },
            raw: true
        })
        // KIỂM TRA XEM USERID NÀY ĐÃ GHÉT CHƯA => NẾU CHƯA THÌ ADD, NẾU RỒI THÌ XÓA
        if (!response[1]) {
            let dislikers = response[0].dislike ? JSON.parse(response[0].dislike) : [] // CONVERT STRING TO ARRAY
            let disliker = dislikers?.find(item => item === dislikerId) // TÌM USERID NÀY ĐÃ CÓ TRONG MẢNG CHƯA
            let dislike = disliker ? JSON.stringify(dislikers?.filter(item => item !== disliker)) : JSON.stringify([...dislikers, dislikerId])
            await db.Likecmt.update({ dislike }, {
                where: { commentId: body.commentId }
            })
        }
        resolve({ err: 0, msg: 'OK !' })

    } catch (error) {
        reject(error)
    }
})
// GET ALL LIKE AND DISLIKE BY COMMENTID (PUBLIC)
// export const getCounterLikeByCommentIdService = () => new Promise(async (resolve, reject) => {
//     try {
//         let response = await db.Comment.findAll({
//             where: { postId },
//             raw: true,
//             nest: true,
//             order: [['createdAt', 'ASC']],
//             include: [
//                 { model: db.User, attributes: ['id', 'firstName', 'lastName', 'avatar', 'avatarUrl'], as: 'commentator' }
//             ]
//         })
//         response ? resolve({ err: 0, msg: 'Get comments done !', commentData: response }) : resolve({ err: 1, msg: 'Cant get comments !', })
//     } catch (error) {
//         reject(error)
//     }
// })
