/**
 * 세션을 조회한다.
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
            select 
                session_id session, expires, data
            from sessions
            where session_id = '${param.session}'
        `
        return await executeQuery(query);
    }
    catch (e) {
        console.log(e);
        return { err_msg: "Something Wrong." }
    }
}