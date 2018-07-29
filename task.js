const Util = require("./util");

var Task = {
    PLANNING: "planning",
    DEVELOPING: "developing",
    RESOLVED: "resolved",
    REJECTED: "rejected",
    HIGH: "high",
    MIDDLE: "middle",
    LOW: "low",
    NIEC_TO_HAVE: "nice_to_have",
    createNew: function(){
        var task = {};
        var metadata = {};
        metadata.database = [
            "projectID",
            "iterationID",
            "name",
            "description",
            "developerList",
            "status",
            "priority",
            "deadline"
        ];
        metadata.arrayField = [
            "developerList",
        ];
        metadata.getDBAbandon = [

        ];

        metadata.getDatabaseField = Util.arrayMinus(metadata.database,metadata.getDBAbandon);
        task.metadata = metadata;
        
        return task;
    }
}

module.exports = Task;