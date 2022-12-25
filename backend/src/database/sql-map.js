const insertComment = require("./query/comment/insert-comment");
const selectComment = require("./query/comment/select-comment");
const deleteHashtagRelativeZero = require("./query/hashtag/delete-hashtag-relative-zero");
const insertHashtag = require("./query/hashtag/insert-hashtag");
const selectHashtag = require("./query/hashtag/select-hashtag");
const selectHashtagRelativepost = require("./query/hashtag/select-hashtag-relativepost");
const updateHashtag = require("./query/hashtag/update-hashtag");
const deletePost = require("./query/post/delete-post");
const deletePostLike = require("./query/post/delete-post-like");
const insertPost = require("./query/post/insert-post");
const insertPostLike = require("./query/post/insert-post-like");
const selectPostDetail = require("./query/post/select-post-detail");
const selectPostLastest = require("./query/post/select-post-lastest");
const selectPostLike = require("./query/post/select-post-like");
const selectPostList = require("./query/post/select-post-list");
const updatePost = require("./query/post/update-post");
const deleteSession = require("./query/session/delete-session");
const selectSession = require("./query/session/select-session");

module.exports = {
    post: {
        selectPostList : (param) => selectPostList(param),
        selectPostDetail : (param) => selectPostDetail(param),
        selectPostLike : param => selectPostLike(param),
        deletePostLike : param => deletePostLike(param),
        insertPostLike : param => insertPostLike(param),
        insertPost : param => insertPost(param),
        selectPostLastest : param => selectPostLastest(param),
        updatePost : param => updatePost(param),
        deletePost : param => deletePost(param),
    },
    session: {
        selectSession : (param) => selectSession(param),
        deleteSession : (param) => deleteSession(param),
    },
    hashtag:{
        deleteHashtagRelativeZero : param => deleteHashtagRelativeZero(param),
        insertHashtag : param => insertHashtag(param),
        selectHashtagRelativepost : param => selectHashtagRelativepost(param),
        selectHashtag : param => selectHashtag(param),
        updateHashtag : param => updateHashtag(param),
    },
    comment:{
        insertComment : param => insertComment(param),
        selectComment : param => selectComment(param),
    }

}