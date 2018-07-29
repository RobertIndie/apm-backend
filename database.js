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
    get: promisify(dbClient.get).bind(dbClient)

};

module.exports = db;