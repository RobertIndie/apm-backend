const Util = require("./util")
const joi = require("joi");

var Iteration = {
    OPEN: 'open',
    CLOSE: 'close',
    init (o=undefined) {
        var iteration = o===undefined?{}:o;
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
        metadata.objField = [
            "data"
        ];
        metadata.getDBAbandon = [
            "taskList",
            "data"
        ];

        metadata.getDatabaseField = Util.arrayMinus(metadata.database,metadata.getDBAbandon);
        iteration.metadata = metadata;

        return iteration;
    },
    validate (obj) {
        const schema = {
            projectID: joi.string().valid('testProjectID').required(),
            name: joi.string().max(20).required(),
            startDate: joi.date().min('2018.08.01').max('2018.12.31').required(),
            endDate: joi.date().min(joi.ref('startDate')).max('2018.12.31').required(),
            status: joi.string().valid([this.OPEN,this.CLOSE]).required()
        };

        return joi.validate(obj,schema);
    }
}

module.exports = Iteration;