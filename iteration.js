const Util = require("./util")

var Iteration = {
    OPEN: 'open',
    CLOSE: 'close',
    createNew: function(){
        var iteration = {};
        var metadata = {};
        metadata.database = [
            "projectID",
            "name",
            "description",
            "startDate",
            "endDate",
            "status",
            "taskList",
            "data"
        ];
        metadata.arrayField = [
            "taskList"
        ];
        metadata.getDBAbandon = [
            "taskList",
            "data"
        ];

        metadata.getDatabaseField = Util.arrayMinus(metadata.database,metadata.getDBAbandon);
        iteration.metadata = metadata;

        return iteration;
    }
}

module.exports = Iteration;