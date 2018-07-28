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

        return project;
    }
}
module.exports = Project;