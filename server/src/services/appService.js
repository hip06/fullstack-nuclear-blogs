import db from '../models/index'

// GET ALL SPECIALIZATIONS
export const getAllSpecService = () => new Promise(async (resolve, reject) => {
    try {
        let response = await db.Specialization.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        response ? resolve({ err: 0, msg: 'OK', response }) : resolve({ err: 1, msg: 'Specialization not found !' })
    } catch (error) {
        reject(error)
    }
})
// GET ALL ROLE
export const getAllRoleService = () => new Promise(async (resolve, reject) => {
    try {
        let response = await db.Role.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        response ? resolve({ err: 0, msg: 'OK', response }) : resolve({ err: 1, msg: 'Roles not found !' })
    } catch (error) {
        reject(error)
    }
})
// GET ALL POSITION
export const getAllPostitionService = () => new Promise(async (resolve, reject) => {
    try {
        let response = await db.Position.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        response ? resolve({ err: 0, msg: 'OK', response }) : resolve({ err: 1, msg: 'Position not found !' })
    } catch (error) {
        reject(error)
    }
})