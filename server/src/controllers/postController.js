import * as postService from "../services/postService";
// CREATE A POST
export const createPost = async (req, res) => {
  const { user, body } = req;
  try {
    if (!user?.id) {
      return res.status(404).json({
        err: 1,
        msg: "Missing id user !",
      });
    }
    if (user?.roleCode === "ADMIN" || user?.roleCode === "CRE") {
      let response = await postService.createPostService(body, user.id);
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        err: 5,
        msg: "Require role Admin or Creator!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at post-controller: " + error,
    });
  }
};
// GET ALL POST BY ID
// export const getAllPostById = async (req, res) => {
//     const { user } = req
//     try {
//         if (!user?.id) {
//             return res.status(404).json({
//                 err: 1,
//                 msg: 'Missing id user !'
//             })
//         }
//         if (user?.roleCode === 'ADMIN' || user?.roleCode === 'CRE') {
//             let response = await postService.createPostService(body, user.id)
//             return res.status(200).json(response)
//         } else {
//             return res.status(400).json({
//                 err: 5,
//                 msg: 'Require role Admin or Creator!'
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//             err: -1,
//             msg: 'Fail at post-controller: ' + error
//         })
//     }
// }

// GET A POST
export const getPost = async (req, res) => {
  const { postId } = req.query;
  try {
    if (!postId)
      return res.status(403).json({
        err: 1,
        msg: "Missing postId !",
      });
    let response = await postService.getPostService(postId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at post-controller: " + error,
    });
  }
};
// GET ALL POST
export const getAllPost = async (req, res) => {
  try {
    let response = await postService.getAllPostService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at post-controller: " + error,
    });
  }
};

export const updatePostById = async (req, res) => {
  try {
    let response = await postService.updatePostByIdService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Error from the server " + error,
    });
  }
};

export const deletePostById = async (req, res) => {
  try {
    let response = await postService.deletePostByIdService(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Error from the server " + error,
    });
  }
};
