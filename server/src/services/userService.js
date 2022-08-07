import db from '../models'

// GET ONE USER
export const getOneUserService = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        let response = await db.User.findOne({
            where: { id },
            attributes: {
                exclude: ['password']
            },
            include: [
                { model: db.Role, attributes: ['value', 'code'] },
                { model: db.Position, attributes: ['value', 'code'] },
            ]
        })
        response ? resolve({ err: 0, msg: 'OK', response }) : resolve({ err: 1, msg: 'User not found !' })
    } catch (error) {
        reject(error)
    }
})

// GET ALL USER (ADMIN REQUIRE)
export const getAllUserService = () => new Promise(async (resolve, reject) => {
    try {
        let response = await db.User.findAll({
            attributes: {
                exclude: ['password']
            },
            include: [
                { model: db.Role, attributes: ['value', 'code'] },
                { model: db.Position, attributes: ['value', 'code'] },
            ]
        })
        response ? resolve({ err: 0, msg: 'OK', response }) : resolve({ err: 1, msg: 'Fail to load user from database !' })
    } catch (error) {
        reject(error)
    }
})

// UPDATE COMMON INFORMATION USER
export const updateUserService = (body, userId) => new Promise(async (resolve, reject) => {
    try {
        await db.User.update(body, {
            where: { id: userId }
        })
        resolve({ err: 0, msg: 'Update done !' })
    } catch (error) {
        reject(error)
    }
})

// UPDATE USER (ADMIN REQUIRE)
export const updateUserByAdminService = (body) => new Promise(async (resolve, reject) => {
    try {
        await db.User.update(body, { where: { id: body.id } })
        resolve({ err: 0, msg: 'Update done !' })
    } catch (error) {
        reject(error)
    }
})


// DELETE USER (ADMIN REQUIRE)
export const deleteUserService = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        await db.User.destroy({ where: { id } })
        resolve({ err: 0, msg: 'Delete user done !' })
    } catch (error) {
        reject(error)
    }
})
