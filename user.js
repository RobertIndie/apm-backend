const Util = require("./util");

var User = {
    db: {},
    getUser(name,callback){
        var user = this.createNew();
        
        this.db.hmget(`users:${name}`,user.metadata.getDatabaseField).then(res=>{
            if(res[0]===null)return callback("null");
            for(var i=0;i<res.length;i++){
                user[user.metadata.getDatabaseField[i]] = res[i];
            }
            user.metadata = undefined;
            callback(user);
        });
    },
    createNew (){
        var user = {};
        var metadata = {};
        metadata.database = [
            "name",
            "password",
            "currentProjectList",
            "currentTaskList",
            "doneTaskList",
            "contributeData"];
        metadata.getDBAbandon = ["password","doneTaskList","contributeData"];

        metadata.getDatabaseField = Util.arrayMinus(metadata.database,metadata.getDBAbandon);

        user.metadata = metadata;
        return user;
    }
};
var user = User.createNew();
module.exports = User;