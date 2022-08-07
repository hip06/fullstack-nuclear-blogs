import * as userService from '../services/userService'
// GET ONE USER
export const getOneUser = async (req, res) => {
    const { user } = req
    try {
        if (!user?.id) {
            return res.status(404).json({
                err: 1,
                msg: 'Missing id user !'
            })
        }
        if (user?.roleCode === 'ADMIN' || user?.roleCode === 'CRE' || user?.roleCode === 'USER') {
            let response = await userService.getOneUserService(user)
            return res.status(200).json(response)
        } else {
            return res.status(400).json({
                err: 5,
                msg: 'Require role Admin or Creator or User !'
            })
        }
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail ai user-controller: ' + error
        })
    }
}
// GET ONE USER BY ID
export const getOneUserById = async (req, res) => {
    const { query } = req
    try {
        if (!query?.id) {
            return res.status(404).json({
                err: 1,
                msg: 'Missing id user !'
            })
        }
        let response = await userService.getOneUserService(query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail ai user-controller: ' + error
        })
    }
}
// GET ALL USER
export const getAllUser = async (req, res) => {
    const { user } = req
    try {
        if (user?.roleCode === 'ADMIN') {
            let response = await userService.getAllUserService()
            return res.status(200).json(response)
        } else {
            return res.status(400).json({
                err: 5,
                msg: 'Require role Admin !'
            })
        }
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail ai user-controller: ' + error
        })
    }
}

// UPDATE COMMON INFO USER
export const updateUser = async (req, res) => {
    const { user, body } = req
    try {
        if (!user?.id) return res.status(404).json({ err: 1, msg: 'Missing userId !' })
        if (body?.roleCode || body?.positionCode) return res.status(401).json({ err: 5, msg: 'Require role Admin for update role and position !' })
        if (user?.roleCode === 'ADMIN' || user?.roleCode === 'CRE' || user?.roleCode === 'USER') {
            let response = await userService.updateUserService(body, user.id)
            return res.status(200).json(response)
        } else {
            return res.status(400).json({
                err: 5,
                msg: 'Require role Admin/Creator/User !'
            })
        }
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail ai user-controller: ' + error
        })
    }
}

// UPDATE USER (ADMIN REQUIRE)
export const updateUserByAdmin = async (req, res) => {
    const { user, body } = req
    try {
        if (!body?.id || !user?.roleCode) return res.status(404).json({ err: 1, msg: 'Missing userId and/or role !' })
        if (user?.roleCode === 'ADMIN') {
            let response = await userService.updateUserByAdminService(body)
            return res.status(200).json(response)
        } else {
            return res.status(400).json({
                err: 5,
                msg: 'Require role Admin !'
            })
        }
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail ai user-controller: ' + error
        })
    }
}

// DELETE USER (ADMIN REQUIRE)
export const deleteUser = async (req, res) => {
    const { user, query } = req
    try {
        if (!query?.id) return res.status(404).json({ err: 1, msg: 'Missing userId !' })
        if (user?.roleCode === 'ADMIN') {
            let response = await userService.deleteUserService(query)
            return res.status(200).json(response)
        } else {
            return res.status(400).json({
                err: 5,
                msg: 'Require role Admin !'
            })
        }
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail ai user-controller: ' + error
        })
    }
}