const express = require('express');
const fs =require('fs');
const sqlMap = require('../../database/sql-map');
const fileRouter = express.Router();

fileRouter.post("/image/upload", async (request, response)=>{
    const BASE_PATH = __dirname + "/../../../uploads"
    const isExists = fs.existsSync( BASE_PATH );
    if( !isExists ) {
        fs.mkdirSync( BASE_PATH, { recursive: true } );
    }
    let {images} = request.body;
    let rtn = []
    if(images.length > 0){
        images.forEach(item => {
            if(item.search("data:image/png;base64") >= 0){
                let filename = (Math.random(new Date().getTime()) * (Math.pow(2,50))).toString(36).split(".").join('')
                rtn.push(filename);
                fs.writeFileSync(`${BASE_PATH}/${filename}`, item.replace('data:image/png;base64,', ''), 'base64')
            }
            else{
                rtn.push(null);
            }
        })
    }
    response.send(rtn)
})

fileRouter.get("/image/view/:filename", async (request, response)=>{
    let {filename} = request.params;
    const BASE_PATH = __dirname + "/../../../uploads"
    filename = filename.replace(/\//, '')
    let rtn = null;
    try{
        rtn = fs.readFileSync(BASE_PATH + "/" + filename);
    }
    catch(e){}
    response.send(rtn);
})

module.exports = fileRouter;