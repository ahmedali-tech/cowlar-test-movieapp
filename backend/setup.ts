const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

import dotenv from 'dotenv';
dotenv.config();

(async () => {
    const mongod = await MongoMemoryServer.create();
    // const mongoUri = mongod.getUri();
    const mongoUri = process.env.MONGODB_CONNECTION_STRING_URL?.replace(
        '<USERNAME>',
        process.env.MONGODB_URL_USERNAME ?? ''
    )?.replace(
        '<PASSWORD>',
        process.env.MONGODB_URL_PASSWORD ?? ''
    );

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((result: { connection: { readyState: any; host: any; }; }) => {
    }).catch((err: any) => {
        console.log(err);
    });;
})();