module.exports = (param) => {
    let _param = {};
    const replaceEscapeString = (str) => {
        return str.split("'")
                .join("%27")
                .split("--")
                .join("%2D%2D")
                .replace(/\<script\>/gi, "&lt;/script&gt;")
                .replace(/\<\/script\>/gi, "&lt;script&gt;")
    }
    if(typeof(param) == 'object'){
        Object.keys(param).forEach(item => {
            if(param[item] != null){
                _param[item] = replaceEscapeString(param[item])
            }
        })
        return _param;
    }
    return {}
}