const {promisify} = require("util");
const Util = require('./util');

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
    hset: promisify(dbClient.hset).bind(dbClient),
    del: promisify(dbClient.del).bind(dbClient),
    keys: promisify(dbClient.keys).bind(dbClient),

    async lock (key) {
        var isLocked = 1;
        do{
            isLocked = await db.exists(`locks:${key}`);
        }
        while(isLocked && !(await Util.sleep(10)));
        await db.set(`locks:${key}`,[1,'PX',10000]);
    },

    async unlock (key) {
        await db.del(`locks:${key}`);
    }
};

async function deleteAllIterations () {
    await db.hset('projects:testProjectID','iterationList',"[]");
    var iterationList = await db.keys('*');
    for(var i in iterationList){
        if(iterationList[i].substring(0,'iterations:'.length)==='iterations:'){
            await db.del(iterationList[i]);
            console.log(`已删除 ${iterationList[i]}`);
        }
    }
}

//deleteAllIterations();

module.exports = db;