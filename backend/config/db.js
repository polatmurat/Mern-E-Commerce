const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("ecommerce").command({ ping: 1 });
        return client;
    } catch (error) {
        console.log(error.message);
        throw error; // again, because we should make this unconducted!
    }
}

module.exports = run;
