var User = {
    createNew: function(){
        var user = {};
        user.abandon = ["doneTaskList","contributeData"];
        user.name = "";
        user.password = "";
        user.currentProjectList = [];
        user.currentTaskList = [];
        user.doneTaskList = [];
        user.contributeData = {};

        return user;
    }
};

module.exports = User;