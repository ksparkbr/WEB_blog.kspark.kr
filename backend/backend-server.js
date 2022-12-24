const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan');
const globalConfig = require('./src/config/global-config')
const sessionConfig = require('./src/config/session-config')
const logger = require('./src/config/winston-config');
const postRouter = require('./src/router/post');
const sessionRouter = require('./src/router/session');
const hashtagRouter = require('./src/router/hashtag');

app.use(bodyParser.json({limit : "50mb"}));
app.use(bodyParser.urlencoded({extended: true, limit : "50mb"}));
app.use(sessionConfig);
app.use(cors(globalConfig.corsOptions));
app.use(morgan("combined"));

app.use("/post", postRouter);
app.use("/session", sessionRouter);
app.use("/tag", hashtagRouter);

app.listen(globalConfig.port, ()=>{
    logger.info(`BLOG.KSPARK.KR Backend is Opened :: Port ${globalConfig.port}`);
})
