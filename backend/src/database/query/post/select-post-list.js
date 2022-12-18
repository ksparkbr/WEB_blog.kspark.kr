/**
 * 블로그 포스트의 목록을 조회한다. (세부기능 추가 필요)
 * @author kspark
 * @param {Object} param
 * @returns {Array} 
 * @since 2022.12.4
 */

const executeQuery = require("../../execute-query");
const safeParam = require("../../safe-param");

module.exports = async (param) => {
    try {
        param = safeParam(param);
        console.log(param);
        let query = `
            select 
                blogpost.POST_ID, TITLE, SUMMARY, THUMBNAIL, HASH_TAGS, WRITE_MODE, POST_DATE, IFNULL(a.LIKE_COUNT, 0) LIKE_COUNT
            from blogpost left join (
                select POST_ID, count(IP) LIKE_COUNT
                  from bloglike
                group by POST_ID
            ) a
            on blogpost.POST_ID = a.POST_ID
            where 1=1 
        `

        if (param.WRITE_MODE != null) query += ` and WRITE_MODE='${param.WRITE_MODE}'`
        if (param.SHOW_MAIN != null) query += `and SHOW_MAIN='${param.SHOW_MAIN}'`
        if (param.HASHTAG != null) query += ` and HASH_TAGS like '%"#${param.HASHTAG}"%'`
        query += `order by blogpost.POST_ID desc`
        console.log(param);
        return await executeQuery(query);
    }
    catch (e) {
        console.log(e);
        return { err_msg: "Something Wrong." }
    }
}