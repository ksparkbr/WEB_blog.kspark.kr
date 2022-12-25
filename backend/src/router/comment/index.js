const express = require('express');
const sqlMap = require('../../database/sql-map');
const sessionCheck = require('../session/session-check');
const bcrypt = require('bcrypt');
const commentRouter = express.Router();

commentRouter.post("/write", async (request, response)=>{
    //post_id, is_reply, reply_comment_idx, author, author_ip, content, password
    let param = request.body;
    param = {...param, author_ip : request.ip}
    param.password = bcrypt.hashSync(param.password, bcrypt.genSaltSync(10));

    await sqlMap.comment.insertComment(param);
    response.send(param);
})

commentRouter.get("/load/:id", async (request, response)=>{
    let {id} = request.params;
    let rtn = await sqlMap.comment.selectComment({post_id: id});
    response.send(rtn);
})

module.exports = commentRouter;