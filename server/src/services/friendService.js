import db from '../models'

// CREATE FRIEND REQUEST
export const createFriendRequestService = (body) => new Promise(async (resolve, reject) => {
    try {
        let [resOne, resTwo] = await Promise.all([
            db.Friend.findOrCreate({
                where: { from: body.from, to: body.to },
                defaults: {
                    from: body.from,
                    to: body.to
                },
                raw: true
            }),
            db.Friend.findOne({ where: { from: body?.to, to: body?.from }, raw: true }),
        ])

        let response = !resOne && !resTwo && await db.Friend.create(body)

        resolve({
            err: response ? 0 : 1,
            msg: 'Yêu cầu kết bạn đã được gửi'
        })
    } catch (error) {
        reject(error)
    }
})