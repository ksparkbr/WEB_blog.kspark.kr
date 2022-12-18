const express = require('express');
const sqlMap = require('../../database/sql-map');
const sessionCheck = require('../session/session-check');
const postRouter = express.Router();

postRouter.post("/list", async (request, response)=>{
    let {session, hashtag} = request.body;
    let param = {WRITE_MODE : "public", HASHTAG : hashtag}
    if(await sessionCheck(session)){
        param.WRITE_MODE = null;
    }
    console.log(param);
    response.send(await sqlMap.post.selectPostList(param));
})

postRouter.post("/view/:id", async (request, response)=>{
    let {id} = request.params;
    let {session} = request.body;

    let param ={WRITE_MODE : "public", POST_ID : id};
    let isadmin = await sessionCheck(session);
    if(isadmin) param = {...param, WRITE_MODE : null};
    let _result = await sqlMap.post.selectPostDetail(param)
    
    if(_result.length > 0){
        let result = _result[0];
        result["admin"] = isadmin;
        response.send(result);
    }
    else{
        response.send("Access Denied");
    }
})


postRouter.get("/like/status/:id", async (request, response)=>{
    let {id} = request.params;
    let likeInfo = await sqlMap.post.selectPostLike({POST_ID: id, IP : request.ip});
    response.send(likeInfo);
})

postRouter.get("/like/cancel/:id", async (request, response)=>{
    let {id} = request.params;
    await sqlMap.post.deletePostLike({POST_ID : id, IP : request.ip});
    response.send("Done");
})

postRouter.get("/like/:id", async (request, response)=>{
    let {id} = request.params;
    let ip = request.ip;
    let likeInfoBefore = await sqlMap.post.selectPostLike({POST_ID: id, IP : request.ip});
    if(likeInfoBefore.length > 0){
        await sqlMap.post.insertPostLike({POST_ID: id, IP : request.ip});
    }
    response.send("Done");
})

module.exports = postRouter;