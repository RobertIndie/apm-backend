const Util = require("./util");



var User = {
    init (dbClient) {
        this.dbClient = dbClient;
    },
    getUser(name){
        var user = this.createNew();
        
    },
    createNew (){
        var user = {};
        user.database = ["name","password","currentProjectList","currentTaskList","doneTaskList","contributeData"];
        user.getDBAbandon = ["password","doneTaskList","contributeData"];

        user.getDatabaseField = Util.arrayMinus(user.database,user.getDBAbandon);
        return user;
    }
};
var user = User.createNew();
module.exports = User;