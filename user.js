const Util = require("./util");

var User = {
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
module.exports = User;