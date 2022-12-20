/**
 * 작성한 블로그 포스트를 DB에 저장한다.
 * @author kspark
 * @param {Object} param
 * @returns {Array} 
 * @since 2022.12.4
 */

 const executeQuery = require("../../execute-query");
const safeParam = require("../../safe-param");
 
 module.exports = async (param) => {
     try{
         param = safeParam(param);
         let query = `
            insert into blogpost(TITLE, CONTENT, SUMMARY, THUMBNAIL, HASH_TAGS, SHOW_MAIN, WRITE_MODE)
            values('${param.title}', '${param.content}', '${param.summary}', '${param.thumbnail}', '${param.hashtags}', '${param.showmain}', '${param.writemode}')
            `
         return await executeQuery(query);
     }
     catch(e){
         return {err_msg : "Something Wrong."}
     }
 }