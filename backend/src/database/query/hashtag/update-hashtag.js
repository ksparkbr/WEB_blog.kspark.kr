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
            update hashtags set expose_main = '${param.expose_main}'
            where idx = ?
        `

        let { queryStr, paramArr } = queryBuilder(query, param);
        return await executeQuery(queryStr, paramArr);
     }
     catch(e){
        console.log(e);
         return {err_msg : "Something Wrong."}
     }
 }