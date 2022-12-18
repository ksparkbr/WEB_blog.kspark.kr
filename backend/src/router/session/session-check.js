const sqlMap = require("../../database/sql-map");

module.exports = async (_session) => {
    if (_session != null) {
        let session = await sqlMap.session.selectSession({ session: _session })
        if (session.length > 0) {
            let data = JSON.parse(session[0].data);
            if (data?.admin) return true;
            else return false;
        }
        else {
            return false;
        }
    }
    else return false;
}