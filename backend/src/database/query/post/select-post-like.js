/**
 * 블로그 포스트 좋아요(공감) 정보 조회
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
            select
                c.POST_ID, 
                IFNULL(c.LIKE_COUNT, 0) LIKE_COUNT, 
                "${param.IP}" IP, 
                IFNULL(d.CHECKED, 0) CHECKED 
                from (
                select a.POST_ID, b.LIKE_COUNT
                from 
                (
                    select POST_ID from blogpost
                )a
                left join
                (
                    select POST_ID, count(IP) LIKE_COUNT from bloglike 
                    where POST_ID=${param.POST_ID}
                    group by POST_ID
                ) b
                on a.POST_ID = b.POST_ID
                where a.POST_ID = ${param.POST_ID}
            ) c
            left join (
                select POST_ID, IP, count(IP) CHECKED 
                from bloglike 
                where POST_ID=${param.POST_ID}
                and IP='${param.IP}' 
                group by POST_ID, IP
            ) d
            on c.POST_ID = d.POST_ID 
        `
        return await executeQuery(query);
    }
    catch(e){
       console.log(e);
        return {err_msg : "Something Wrong."}
    }
}