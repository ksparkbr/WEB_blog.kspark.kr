module.exports = (param) => {
    let _param = {};
    const replaceEscapeString = (str) => {
        console.log(str);
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
                if(typeof(param[item]) === 'string'){
                    _param[item] = replaceEscapeString(param[item])
                }
                else{
                    _param[item] = param[item];
                }
            }
        })
        return _param;
    }
    return {}
}