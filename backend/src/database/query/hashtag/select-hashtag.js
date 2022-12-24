/**
 * 해시태그 테이블을 조회한다.
 * @author kspark
 * @param {Object} 
 * @returns {Array}
 * @since 2022.12.7
 */

 const executeQuery = require("../../execute-query");
const safeParam = require("../../safe-param");
 
 module.exports = async (param) => {
     try{
         let query = `select * from hashtags where 1=1`
         if(param.hashtags?.length > 0){
            let _hashtagStringify = "'" + param.hashtags.join("','") + "'";
            _hashtagStringify = _hashtagStringify.replace(/--/gi, '');
            query += ` and hashtag in (${_hashtagStringify})`
         }
         if(!!param.keyword) query += ` and hashtag like '%${param.keyword}%'`
         if(param.expose_main == 'Y') query += ` and expose_main = 'Y'`
         query += ` order by idx desc`
         if(!!param.keyword) query += ` limit 20`
         
         return await executeQuery(query);
     }
     catch(e){
        console.log(e);
         return {err_msg : "Something Wrong."}
     }
 }