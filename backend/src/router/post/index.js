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

postRouter.post("/write", async (request, response)=>{
    //title, content, summary, thumbnail, hashtags, showmain, writemode, session_id
    let {title, content, summary, thumbnail, hashtags, showmain, writemode, session} = request.body;
    if(await sessionCheck(session)){
        //TITLE, CONTENT, SUMMARY, THUMBNAIL, HASH_TAGS, WRITE_MODE, SHOW_MAIN
        let _hastag = await sqlMap.hashtag.selectHashtag({hashtags})
        let hastag = _hastag.map(item => item.hashtag);
        let filtered = hashtags.filter(item => !hastag.includes(item));
        await sqlMap.hashtag.insertHashtag(filtered);

        hashtags = JSON.stringify(hashtags);
        let param ={title, content, summary, thumbnail, hashtags, showmain, writemode};

        await sqlMap.post.insertPost(param);
        let lastPostId = await sqlMap.post.selectPostLastest(param);
        if(lastPostId.length > 0) lastPostId = lastPostId[0];
        response.send(lastPostId);
    }
    else{
        response.send("Access Denied");
    }
})

postRouter.post("/edit/:id", async(request, response)=>{
    let {id} = request.params;
    let {title, content, summary, thumbnail, hashtags, showmain, writemode, session} = request.body;
    if(await sessionCheck(session)){
        let _hastag = await sqlMap.hashtag.selectHashtag({hashtags})
        let hastag = _hastag.map(item => item.hashtag);
        let filtered = hashtags.filter(item => !hastag.includes(item));
        await sqlMap.hashtag.insertHashtag(filtered);

        hashtags = JSON.stringify(hashtags);
        let param ={title, content, summary, thumbnail, hashtags, showmain, writemode, post_id: id};

        await sqlMap.post.updatePost(param);
        await sqlMap.hashtag.deleteHashtagRelativeZero({});
        response.send({POST_ID : id});
    }
    else{
        response.send("Access Denied");
    }
})

postRouter.post("/delete/:id", async(request, response)=>{
    let {id} = request.params;
    let {session} = request.body;
    let isadmin = await sessionCheck(session);
    if(isadmin){
        await sqlMap.post.deletePost({id});
        await sqlMap.hashtag.deleteHashtagRelativeZero({});
        response.send("Post is Deleted");
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

postRouter.post("/search", async (request, response)=>{
    let {keyword, session} = request.body;
    let param = {keyword};
    if(!await sessionCheck(session)) param = {...param, WRITE_MODE : 'public'}
    response.send(await sqlMap.post.selectPostList(param));
})

module.exports = postRouter;