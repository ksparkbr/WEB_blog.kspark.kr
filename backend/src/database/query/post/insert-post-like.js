/**
 * 블로그 포스트에 좋아요(공감) 표시
 * @author kspark
 * @param {Object} param
 * @returns {Array} 
 * @since 2022.12.12
 */

const executeQuery = require("../../execute-query");
const safeParam = require("../../safe-param");

module.exports = async (param) => {
    try{
        param = safeParam(param);
        let query = `
           insert into bloglike(POST_ID, IP)
           values('${param.POST_ID}', '${param.IP}')
           `
        return await executeQuery(query);
    }
    catch(e){
       console.log(e);
        return {err_msg : "Something Wrong."}
    }
}