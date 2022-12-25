/**
 * 작성한 댓글을 저장한다.
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
            insert into blogcomment(post_id, is_reply, reply_comment_idx, author, author_ip, content, password) values
        `
        query += `(${param.post_id}, '${param.is_reply}', ${param.reply_comment_idx}, '${param.author}', '${param.author_ip}', '${param.content}', '${param.password}')`
        return await executeQuery(query);
        
     }
     catch(e){
        console.log(e);
         return {err_msg : "Something Wrong."}
     }
 }