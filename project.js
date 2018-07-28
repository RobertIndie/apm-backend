const DateComparison = require("./date_comparison/index.js");

var Project = {
    OPEN: 'oepn',
    CLOSE: 'close',
    createNew: function(){
        var project = {}
        project.abadon = ["developerList","iterationList"];
        project.name = "";
        project.description = "";
        project.startDate = "";
        project.endDate = "";
        project.status = this.OPEN;
        project.developerList = [];
        project.currentIteration = {};
        project.iterationList = [];

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