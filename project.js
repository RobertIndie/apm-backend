const Util = require("./util");
const DateComparison = require("./date_comparison/index.js");

var Project = {
    OPEN: 'oepn',
    CLOSE: 'close',
    createNew: function(){
        var project = {}
        var metadata = {};
        metadata.database = [
            "name",
            "description",
            "startDate",
            "endDate",
            "status",
            "developerList",
            "currentIteration",
            "iterationList"
        ];
        metadata.arrayField = [
            "developerList",
            "iterationList"
        ];
        metadata.getDBAbandon = [
            "developerList",
            "iterationList"
        ];

        metadata.getDatabaseField = Util.arrayMinus(metadata.database,metadata.getDBAbandon);
        project.metadata = metadata;

        project.AddIteration = function(iteration){
            if(!DateComparison.isIncluded(
                {start:this.startDate,end:this.endDate},
                {start:iteration.startDate,end:iteration.endDate}
            )){
                return false;
            }
            this.iterationList.push(iteration);
        }

        return project;
    }
}

module.exports = Project;