const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan');
const globalConfig = require('./src/config/global-config')
const sessionConfig = require('./src/config/session-config')
const logger = require('./src/config/winston-config');
const fileRouter = require('./src/router/file');

app.use(bodyParser.json({limit : "50mb"}));
app.use(bodyParser.urlencoded({extended: true, limit : "50mb"}));
app.use(sessionConfig);
app.use(cors(globalConfig.corsOptions));
app.use(morgan("combined"));

app.use("/file", fileRouter);

app.listen(globalConfig.port, ()=>{
    logger.info(`BLOG.KSPARK.KR File-Server is Opened :: Port ${globalConfig.port}`);
})
