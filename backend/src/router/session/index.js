const express = require('express');
const sessionRouter = express.Router();
const bcrypt = require('bcrypt');
const sessionCheck = require('./session-check');
const sqlMap = require('../../database/sql-map');


sessionRouter.post("/signin", async (request, response)=>{
    let {id, password} = request.body;
    if(id == process.env.ADMIN_EMAIL){
        if(bcrypt.compareSync(password, process.env.ADMIN_PASSWORD)){
            request.session["admin"] = true;
            response.send(request.session.id);
        }
        else{
            response.send("Access Denied");
        }
    }
    else{
        response.send("Access Denied");
    }
})

sessionRouter.post("/signout", async (request, response)=>{
    let {session} = request.body;
    await sqlMap.session.deleteSession({session});
    response.send("Signed Out");
})

sessionRouter.post("/check", async (request, response)=>{
    let {session} = request.body;
    let check = await sessionCheck(session);
    response.send(check);
})

module.exports = sessionRouter;