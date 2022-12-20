/**
 * 블로그 포스트를 삭제한다.
 * @author kspark
 * @param {Object} param
 * @returns {Array} 
 * @since 2022.12.7
 */

 const executeQuery = require("../../execute-query");
const safeParam = require("../../safe-param");
 
 module.exports = async (param) => {
     try{
        param = safeParam(param);
        let query = `
            delete from blogpost where POST_ID=${param.id}
        `
        console.log(query);
         return await executeQuery(query);
     }
     catch(e){
        console.log(e);
         return {err_msg : "Something Wrong."}
     }
 }