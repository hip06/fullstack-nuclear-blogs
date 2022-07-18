import * as appService from '../services/appService'

// GET ALL SPECIALIZATION
export const getAllSpec = async (req, res) => {
    try {
        let response = await appService.getAllSpecService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail ai auth-controller: ' + error
        })
    }
}
// GET ALL ROLE
export const getAllRole = async (req, res) => {
    try {
        let response = await appService.getAllRoleService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail ai auth-controller: ' + error
        })
    }
}
// GET ALL POSITION
export const getAllPosition = async (req, res) => {
    try {
        let response = await appService.getAllPostitionService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail ai auth-controller: ' + error
        })
    }
}