const express = require('express');
const sqlMap = require('../../database/sql-map');
const sessionCheck = require('../session/session-check');
const hashtagRouter = express.Router();

hashtagRouter.get("/list", async (request, response)=>{
    let hashtagList = await sqlMap.hashtag.selectHashtagRelativepost({});
    response.send(hashtagList);
})


hashtagRouter.get("/menu", async (request, response)=>{
    let menuList = await sqlMap.hashtag.selectHashtag({expose_main : 'Y'});
    response.send(menuList);
})

hashtagRouter.post("/update/:expose", async (request, response)=>{
    let {expose} = request.params;
    let {idx,session} = request.body;
    let isAdmin = await sessionCheck(session)
    if(isAdmin){
        await sqlMap.hashtag.updateHashtag({expose, idx})
        response.send("Update OK");
    }
    else{
        response.send("Access Denied");
    }
})

hashtagRouter.post("/search", async (request, response)=>{
    let {keyword, session} = request.body;
    let param = {keyword};
    if(!await sessionCheck(session)) param = {...param, WRITE_MODE: 'public'}
    response.send(await sqlMap.hashtag.selectHashtagRelativepost(param));
})

module.exports = hashtagRouter;