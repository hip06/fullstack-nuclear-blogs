import * as commentService from '../services/commentService'

// CREATE A COMMENT
export const createComment = async (req, res) => {
    const { user, body } = req
    try {
        if (!user?.id || !body?.postId) {
            return res.status(404).json({
                err: 1,
                msg: 'Missing inputs !'
            })
        }
        if (user?.roleCode === 'ADMIN' || user?.roleCode === 'CRE' || user?.roleCode === 'USER') {
            let response = await commentService.createCommentService(body, user.id)
            return res.status(200).json(response)
        } else {
            return res.status(400).json({
                err: 5,
                msg: 'Require role Admin or Creator or User!'
            })
        }
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at comment-controller: ' + error
        })
    }
}

// GET ALL COMMENT BY POST
export const getCommentsByPostId = async (req, res) => {
    const { query } = req
    try {
        if (!query?.postId) {
            return res.status(404).json({
                err: 1,
                msg: 'Missing inputs !'
            })
        }
        let response = await commentService.getCommentsByPostIdService(query.postId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at comment-controller: ' + error
        })
    }
}

// UPDATE COMMENT BY USERID & POSTID & PARENTID

// DELETE COMMENT BY USERID & POSTID & PARENTID