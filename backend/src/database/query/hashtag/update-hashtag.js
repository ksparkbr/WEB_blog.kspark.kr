/**
 * 해시태그 노출 여부를 변경한다.
 * @author kspark
 * @param {Array} param 
 * @returns {Array} 
 * @since 2022.12.4
 */

 const executeQuery = require("../../execute-query");
const safeParam = require("../../safe-param");
 
 module.exports = async (param) => {
     try{
        param = safeParam(param)
        let query = `
            update hashtags set expose_main = '${param.expose}'
            where idx = ${param.idx}
        `
        return await executeQuery(query);
     }
     catch(e){
        console.log(e);
         return {err_msg : "Something Wrong."}
     }
 }