/**
 * 해시태그가 포함된 게시글이 0인 해시태그를 삭제한다.
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
        delete from hashtags 
        where hashtag in (
            select hashtag from (
                select hashtag, relative_post from (
                    select hashtags.idx, hashtags.hashtag, hashtags.expose_main, hashtags.create_date, count(blogpost.HASH_TAGS) as relative_post 
                    from blogpost 
                    right join hashtags 
                    on blogpost.HASH_TAGS like concat('%', hashtags.hashtag, '%')   
                    group by hashtags.idx, hashtags.hashtag, hashtags.expose_main, hashtags.create_date
                ) a
                where a.relative_post = 0
            ) b
        )
        `
        return await executeQuery(query);
    }
    catch(e){
        return {err_msg : "Something Wrong."}
    }
}