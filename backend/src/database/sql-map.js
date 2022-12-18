const deletePostLike = require("./query/post/delete-post-like");
const insertPostLike = require("./query/post/insert-post-like");
const selectPostDetail = require("./query/post/select-post-detail");
const selectPostLike = require("./query/post/select-post-like");
const selectPostList = require("./query/post/select-post-list");
const deleteSession = require("./query/session/delete-session");
const selectSession = require("./query/session/select-session");

module.exports = {
    post: {
        selectPostList : (param) => selectPostList(param),
        selectPostDetail : (param) => selectPostDetail(param),
        selectPostLike : param => selectPostLike(param),
        deletePostLike : param => deletePostLike(param),
        insertPostLike : param => insertPostLike(param),
    },
    session: {
        selectSession : (param) => selectSession(param),
        deleteSession : (param) => deleteSession(param),
    }
}