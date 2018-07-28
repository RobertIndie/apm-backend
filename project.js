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
            this.iterationList.push(iteration);
        }

        return project;
    }
}

module.exports = Project;