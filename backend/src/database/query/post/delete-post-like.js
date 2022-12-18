/**
 * 블로그 포스트에 좋아요(공감) 취소
 * @author kspark
 * @param {Object} param
 * @returns {Array} 
 * @since 2022.12.13
 */

const executeQuery = require("../../execute-query");
const safeParam = require("../../safe-param");

module.exports = async (param) => {
    try {
        param = safeParam(param);
        let query = `
            delete from bloglike
            where POST_ID='${param.POST_ID}'
              and IP='${param.IP}'
            `
        return await executeQuery(query);
    }
    catch (e) {
        console.log(e);
        return { err_msg: "Something Wrong." }
    }
}