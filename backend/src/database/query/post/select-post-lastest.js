/**
 * 최근에 올린 블로그 포스트의 ID를 조회한다.
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
         let query = `select max(post_id) POST_ID from blogpost`
        
         return await executeQuery(query);
     }
     catch(e){
         return {err_msg : "Something Wrong."}
     }
 }