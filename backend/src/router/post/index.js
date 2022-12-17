const express = require('express');
const sqlMap = require('../../database/sql-map');
const postRouter = express.Router();

postRouter.post("/list", async (request, response)=>{
    response.send(await sqlMap.post.selectPostList({}));
})

module.exports = postRouter;