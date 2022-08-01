import db from '../models/index'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// HASH PASSWORD
const hanhPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

// REGISTER
export const registerService = (body) => new Promise(async (resolve, reject) => {
    try {
        let response = await db.User.findOrCreate({
            where: { email: body?.email },
            defaults: {
                email: body?.email,
                password: hanhPassword(body?.password),
                id: uuidv4(),
                roleCode: 'USER'
            },
            raw: true
        })
        resolve({
            err: response?.[1] ? 0 : 3,
            msg: response?.[1] ? 'Tạo tài khoản thành công ! Hãy đăng nhập' : `Email ${body.email} đã được sử dụng trước đó ! Hãy đăng nhập hoặc tạo tài khoản bằng email chưa được sử dụng`,
        })
    } catch (error) {
        reject(error)
    }
})

// LOGIN
export const loginService = (body) => new Promise(async (resolve, reject) => {
    try {
        let response = await db.User.findOne({
            where: { email: body?.email },
        })
        if (!response) {
            resolve({
                err: 2,
                msg: 'Email chưa được đăng ký !'
            })
        } else {
            let isCorrectPassword = bcrypt.compareSync(body.password, response?.password)
            // generate access token
            let token = isCorrectPassword
                ? jwt.sign({ id: response.id, email: response.email, roleCode: response.roleCode }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                : ''
            resolve({
                err: isCorrectPassword ? 0 : 3,
                msg: isCorrectPassword ? 'Đăng nhập thành công !' : 'Mật khẩu không đúng !',
                token: token,
                id: response.id
            })
        }
    } catch (error) {
        reject(error)
    }
})

// LOGIN WITH GOOGLE
export const loginGoogleService = (body) => new Promise(async (resolve, reject) => {
    try {
        let response = await db.User.findOrCreate({
            where: { id: body?.id },
            defaults: {
                ...body,
                password: uuidv4(),
                roleCode: 'USER',
            }
        })
        const { id, email, roleCode } = response[0]
        // generate access token
        let token = jwt.sign({ id: id, email: email, roleCode: roleCode }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })

        resolve({
            err: 0,
            msg: 'Đăng nhập thành công !',
            token: token,
            id
        })
    } catch (error) {
        reject(error)
    }
})