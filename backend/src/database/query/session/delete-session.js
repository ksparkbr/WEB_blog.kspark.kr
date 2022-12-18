/**
 * 세션을 삭제한다.
 * @author kspark
 * @param {Object} param
 * @returns {Array} 
 * @since 2022.12.18
 */

const executeQuery = require("../../execute-query");
const safeParam = require("../../safe-param");

module.exports = async (param) => {
    try {
        param = safeParam(param);
        let query = `
            delete from sessions
            where session_id = '${param.session}'
        `
        return await executeQuery(query);
    }
    catch (e) {
        return { err_msg: "Something Wrong." }
    }
}