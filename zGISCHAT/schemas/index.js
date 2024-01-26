const mongoose = require('mongoose');

const {MONGO_ID, MONGO_PASSWORD, NODE_ENV} = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;
console.error(MONGO_URL)
console.log(MONGO_URL);
const connect = () => {
    if (NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    console.log(`######\nmongodb\n######`)
    mongoose.connect(MONGO_URL, {
            dbName: 'gifchat',
            useNewUrlParser: true,
        },
    ).then(() => console.log('MONGODB 연결 성공'))
        .catch((e) => {
            console.error(e)
            console.error(`'MONGODB 연결 실패로 프로세스 종료`)
        });
};

mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});

const createConnection = () => {
    let retryCount = 0;
    const maxRetries = 3;

    return () => {
        console.error(`#####\n몽고DB연결끊어짐!!! 재시도횟수 :  ${retryCount} \n#####`);
        if (retryCount < maxRetries) {
            retryCount++;
            connect();
        } else {
            console.error(`몽고DB  ${retryCount} 번 재시도 후 프로세스 종료`);
            process.exit(1);
        }
    };
};

mongoose.connection.on('disconnected', createConnection);

module.exports = connect;
