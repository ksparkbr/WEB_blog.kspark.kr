/**
 * 해시태그 목록 및 해시태그가 포함된 게시글 갯수를 조회한다.
 * @author kspark
 * @param {Object} 
 * @returns {Array}
 * @since 2022.12.11
 */

const executeQuery = require("../../execute-query");
const safeParam = require("../../safe-param");

module.exports = async (param) => {
    try{
        param = safeParam(param);
        let query = `
        select 
            hashtags.idx, 
            hashtags.hashtag, 
            hashtags.expose_main, 
            hashtags.create_date, 
            count(blogpost.HASH_TAGS) as relative_post 
        from blogpost 
        right join hashtags 
        on blogpost.HASH_TAGS like concat('%', hashtags.hashtag, '%')   
        group by hashtags.idx, hashtags.hashtag, hashtags.expose_main, hashtags.create_date
        order by idx desc
        `
        return await executeQuery(query);
    }
    catch(e){
        return {err_msg : "Something Wrong."}
    }
}