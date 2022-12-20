/**
 * Node Server 구동, Mysql 연결을 위한 기본 설정값 객체
 * @author ksparkbr
 * @since 2022.12.17
 */

require('dotenv').config();

const globalConfig = {
    port: process.env.APP_PORT,
    corsOptions: {
        origin: ['http://blog.kspark.kr', 'http://blog.kspark.kr:3000', 'http://localhost:3000', 'http://146.56.100.135', 'http://146.56.100.135:3000'],
        credentials: true,            //access-control-allow-credentials:true
        optionSuccessStatus: 200,
    }
}

module.exports = globalConfig;