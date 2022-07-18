import db from '../models'
import { v4 as uuidv4 } from 'uuid';

// POST A POST
export const createPostService = (body, authorId) => new Promise(async (resolve, reject) => {
    let data = { ...body, authorId, id: uuidv4() }
    let bulkData = JSON.parse(data.tags)?.map(tag => ({ tag, specCode: body?.specCode }))
    let editedBulkData = []
    try {
        let existedTagBySpecCode = await db.Tag.findAll({ where: { specCode: body.specCode }, raw: true })
        bulkData.forEach(t => {
            let check = 0
            if (existedTagBySpecCode.some(i => i.tag === t.tag)) {
                check += 1
            }
            if (check === 0) editedBulkData = [...editedBulkData, { tag: t.tag, specCode: body.specCode }]
        })
        let [responsePost, responseTag] = await Promise.all([db.Post.create(data), editedBulkData && db.Tag.bulkCreate(editedBulkData)])
        resolve({ err: 0, msg: 'Create OK', responsePost, responseTag })
    } catch (error) {
        reject(error)
    }
})

// GET A POST (PUBLIC)
export const getPostService = (postId) => new Promise(async (resolve, reject) => {
    try {
        let response = await db.Post.findOne({
            where: { id: postId },
            raw: true,
            nest: true,
            include: [
                { model: db.User, attributes: ['firstName', 'lastName', 'avatar', 'avatarUrl'], as: 'author' },
                { model: db.Specialization, attributes: ['value'], as: 'specialization' },
            ]
        })
        response ? resolve({ err: 0, msg: 'OK', response }) : resolve({ err: 2, msg: 'Cannot get all post !' })
    } catch (error) {
        reject(error)
    }
})

// GET ALL POST BY ID
export const getAllPostByIdService = (authorId) => new Promise(async (resolve, reject) => {
    try {
        let response = await db.Post.findAll({
            where: { authorId },
            raw: true
        })
        response ? resolve({ err: 0, msg: 'OK', response }) : resolve({ err: 2, msg: 'Cannot get all post !' })
    } catch (error) {
        reject(error)
    }
})
// GET ALL POST (PUBLIC)
export const getAllPostService = () => new Promise(async (resolve, reject) => {
    try {
        let response = await db.Post.findAll({
            raw: true,
            nest: true,
            include: [
                { model: db.User, attributes: ['firstName', 'lastName', 'avatar', 'avatarUrl'], as: 'author' },
                { model: db.Specialization, attributes: ['value'], as: 'specialization' },
            ]
        })
        response ? resolve({ err: 0, msg: 'Create OK', response }) : resolve({ err: 2, msg: 'Cannot get all post !' })
    } catch (error) {
        reject(error)
    }
})

// UPDATE A POST

// DELETE A POST