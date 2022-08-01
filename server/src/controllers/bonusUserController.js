import * as bonusUserService from '../services/bonusUserService'
// UPDATE BONUS INFO USER
export const updateBonusInfo = async (req, res) => {
    const { user, body } = req
    try {
        if (!user?.id) {
            return res.status(404).json({
                err: 1,
                msg: 'Missing id user !'
            })
        }
        if (user?.roleCode === 'ADMIN' || user?.roleCode === 'CRE' || user?.roleCode === 'USER') {
            let response = await bonusUserService.updateBonusInfoService({ userId: user.id, body })
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
            msg: 'Fail ai auth-controller: ' + error
        })
    }
}
// GET ALL BONUS INFO USER
export const getBonusInfos = async (req, res) => {
    const { query } = req
    try {
        if (!query?.userId) {
            return res.status(404).json({
                err: 1,
                msg: 'Missing id user !'
            })
        }
        let response = await bonusUserService.getBonusInfosService(query.userId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail ai auth-controller: ' + error
        })
    }
}