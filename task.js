const Util = require("./util");
const joi = require("joi");

var Task = {
    PLANNING: "planning",
    DEVELOPING: "developing",
    RESOLVED: "resolved",
    REJECTED: "rejected",
    HIGH: "high",
    MIDDLE: "middle",
    LOW: "low",
    NIEC_TO_HAVE: "nice_to_have",
    init (o) {
        var task = o===null?{}:o;
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
    },
    validate (obj) {
        const schema = {
            projectID: joi.string().valid('testProjectID').required(),
            iterationID: joi.string().required(),
            name: joi.string().max(20).required(),
            status: joi.string().valid([this.PLANNING,this.DEVELOPING,this.RESOLVED,this.REJECTED]).required(),
            priority: joi.string().valid([this.HIGH,this.LOW,this.MIDDLE,this.NIEC_TO_HAVE]).required()
        };

        return joi.validate(obj,schema);
    }
}

module.exports = Task;