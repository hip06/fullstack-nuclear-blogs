import * as authService from '../services/authService'
// REGISTER
export const register = async (req, res) => {
    const { body } = req
    try {
        if (!body?.email || !body?.password) {
            return res.status(401).json({
                err: 1,
                msg: 'Quên email hoặc/và mật khẩu !'
            })
        }

        let response = await authService.registerService(body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail ai auth-controller: ' + error
        })
    }
}
//LOGIN
export const login = async (req, res) => {
    const { body } = req
    try {
        if (!body?.email || !body?.password) {
            return res.status(401).json({
                err: 1,
                msg: 'Quên email hoặc/và mật khẩu !'
            })
        }

        let response = await authService.loginService(body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail ai auth-controller: ' + error
        })
    }
}
export const loginSucess = async (req, res) => {
    const { body } = req
    try {
        if (!body?.id || !body?.tokenLogin) {
            return res.status(401).json({
                err: 1,
                msg: 'Quên email hoặc/và mật khẩu !'
            })
        }

        let response = await authService.loginSucessService(body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail ai auth-controller: ' + error
        })
    }
}
// LOGIN WITH GOOGLE
// export const loginGoogle = async (req, res) => {
//     const { body } = req
//     try {
//         if (!body?.id || !body?.email) {
//             return res.status(401).json({
//                 err: 1,
//                 msg: 'Quên userId !'
//             })
//         }
//         let response = await authService.loginGoogleService(body)
//         return res.status(200).json(response)

//     } catch (error) {
//         return res.status(500).json({
//             err: -1,
//             msg: 'Fail ai auth-controller: ' + error
//         })
//     }
// }