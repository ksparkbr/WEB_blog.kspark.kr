/**
 * 댓글을 삭제한다.
 * @author kspark
 * @param {Array} param 
 * @returns {Array} 
 * @since 2022.12.26
 */

const executeQuery = require("../../execute-query");
const safeParam = require("../../safe-param");
 
 module.exports = async (param) => {
     try{
        param = safeParam(param);
        let query = `
            delete from blogcomment
            where 1=1
        `
        if(!!param.post_id) query += ` and post_id = ${param.post_id}`
        if(!!param.comment_idx) query += ` and (idx = ${param.comment_idx} or reply_comment_idx = ${param.comment_idx})`
        return await executeQuery(query);
        
     }
     catch(e){
        console.log(e);
         return {err_msg : "Something Wrong."}
     }
 }