/**
 * 해당 포스트의 댓글을 불러온다.
 * @author kspark
 * @param {Array} param 배열이 들어간다. param : [{hashtag, expose_main}, ...]
 * @returns {Array} 
 * @since 2022.12.26
 */

const executeQuery = require("../../execute-query");
const safeParam = require("../../safe-param");
 
 module.exports = async (param) => {
     try{
        param = safeParam(param);
        let query = `
            select
                idx,
                post_id,
                is_reply,
                reply_comment_idx,
                author,
                author_ip,
                content,
                password,
                comment_date
            from blogcomment
            where 1=1
        `
        if(!!param.post_id) query += ` and post_id=${param.post_id}`
        return await executeQuery(query);
        
     }
     catch(e){
        console.log(e);
         return {err_msg : "Something Wrong."}
     }
 }