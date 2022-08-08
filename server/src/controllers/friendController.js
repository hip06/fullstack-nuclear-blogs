import * as friendService from '../services/friendService'
// GET ONE USER
export const createFriendRequest = async (req, res) => {
    const { from, to } = req.body
    try {
        if (!from || !to) {
            return res.status(404).json({
                err: 1,
                msg: 'Missing id user !'
            })
        }
        let response = await friendService.createFriendRequestService(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail ai friend-controller: ' + error
        })
    }
}