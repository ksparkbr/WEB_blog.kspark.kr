const express = require('express');
const sqlMap = require('../../db/sql-map');
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

hashtagRouter.post("/update/:expose/", async (request, response)=>{
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

hashtagRouter.get("/search", async (request, response)=>{
    let {keyword} = request.query;
    response.send(await sqlMap.hashtag.selectHashtag({keyword}));
})

module.exports = hashtagRouter;