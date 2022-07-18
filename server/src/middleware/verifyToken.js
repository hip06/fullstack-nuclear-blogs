import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// VERIFY ACCESS TOKEN
export default (req, res, next) => {
    let token = req.headers['access-token']

    if (!token) return res.status(404).json({ err: 1, msg: 'Missing token !' })
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
        if (err) return res.status(401).json({ err: 1, msg: 'Require authentication !' })

        req.user = decode
        next()
    })
}
