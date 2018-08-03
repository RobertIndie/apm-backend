const {promisify} = require("util");

var redis = require("redis"),
    dbClient = redis.createClient();

dbClient.on("error", function (err) {
    console.log("[Radies Error]" + err);
});

dbClient.on("ready",function (){
    console.log("Redis connect successful!");
})

db = {
    client: dbClient,
    get: promisify(dbClient.get).bind(dbClient),
    set: promisify(dbClient.set).bind(dbClient),
    hmget: promisify(dbClient.hmget).bind(dbClient),
    hget: promisify(dbClient.hget).bind(dbClient),
    smembers: promisify(dbClient.smembers).bind(dbClient),
    exists: promisify(dbClient.exists).bind(dbClient),
    hmset: promisify(dbClient.hmset).bind(dbClient),
    hset: promisify(dbClient.hset).bind(dbClient)
};

module.exports = db;