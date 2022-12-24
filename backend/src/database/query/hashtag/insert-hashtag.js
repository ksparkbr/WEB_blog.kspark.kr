/**
 * 추출된 해시태그를 DB에 저장한다.
 * @author kspark
 * @param {Array} param 배열이 들어간다. param : [{hashtag, expose_main}, ...]
 * @returns {Array} 
 * @since 2022.12.4
 */

 const executeQuery = require("../../execute-query");
const safeParam = require("../../safe-param");
 
 module.exports = async (param) => {
     try{
        param = safeParam(param);
        let hashtags = Object.values(param)
        if(hashtags.length > 0){
            let query = `
                insert into hashtags(hashtag, expose_main) values
            `
            query += hashtags.map(item => `('${item}', 'N')`).join(',');

            return await executeQuery(query);
        }
        else{
            return {err_msg : "Hashtag Length is 0"}
        }
     }
     catch(e){
        console.log(e);
         return {err_msg : "Something Wrong."}
     }
 }