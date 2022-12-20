/**
 * 블로그 포스트를 수정한다.
 * @author kspark
 * @param {Object} param
 * @returns {Array} 
 * @since 2022.12.5
 */

const executeQuery = require("../../execute-query");
const safeParam = require("../../safe-param");
 
 module.exports = async (param) => {
     try{
        //title, content, summary, thumbnail, hashtags, showmain, writemode, session
        param = safeParam(param);
        let query = `
            update blogpost 
            set TITLE = '${param.title}',
                CONTENT = '${param.content}',
                SUMMARY = '${param.summary}',
                THUMBNAIL = '${param.thumbnail}',
                HASH_TAGS = '${param.hashtags}',
                SHOW_MAIN = '${param.showmain}',
                WRITE_MODE = '${param.writemode}'
            where POST_ID = ${param.post_id}
        `
         return await executeQuery(query);
     }
     catch(e){
        console.log(e);
         return {err_msg : "Something Wrong."}
     }
 }