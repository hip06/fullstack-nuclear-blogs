import db from '../models'

// UPDATE BONUS INFO USER
export const updateBonusInfoService = ({ userId, body }) => new Promise(async (resolve, reject) => {
    try {
        let response = await db.BonusUser.findOrCreate({
            where: { userId },
            defaults: { userId, ...body }
        })
        if (!response[1]) {
            let { friends } = response[0]
            let friendsArr = JSON.parse(friends)
            let friendsFinal
            if (friendsArr.some(userId => userId === JSON.parse(body.friends)[0])) {
                friendsFinal = JSON.stringify(friendsArr.filter(userId => userId !== JSON.parse(body.friends)[0]))
            } else {
                friendsFinal = JSON.stringify([...friendsArr, ...JSON.parse(body.friends)])
            }
            await db.BonusUser.update({ ...body, friends: friendsFinal }, { where: { userId } })
        }
        resolve({ err: 0, msg: 'OK' })
    } catch (error) {
        reject(error)
    }
})
// GET ALL BONUS INFO USER
export const getBonusInfosService = (userId) => new Promise(async (resolve, reject) => {
    try {
        let response = await db.BonusUser.findAll({
            where: { userId },
        })
        response ? resolve({ err: 0, msg: 'OK', response }) : resolve({ err: 1, msg: 'Fail to load user from database !' })
    } catch (error) {
        reject(error)
    }
})
// GET FRIENDS LIMIT 10