const selectPostList = require("./query/post/select-post-list");

module.exports = {
    post: {
        selectPostList : (param) => selectPostList(param),
    }
}