/**
 * 블로그 포스트를 조회한다.
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
                POST_ID, TITLE, THUMBNAIL, SUMMARY, CONTENT, HASH_TAGS, WRITE_MODE, SHOW_MAIN, POST_DATE
            from blogpost
            where 1=1
              and POST_ID= ${param.POST_ID}
        `
        if (param.WRITE_MODE != null) query += ` and WRITE_MODE='${param.WRITE_MODE}'`
        return await executeQuery(query);
    }
    catch (e) {
        console.log(e);
        return { err_msg: "Something Wrong." }
    }
}