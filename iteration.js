var Iteration = {
    OPEN: 'open',
    CLOSE: 'close',
    createNew: function(){
        var iteration = {};
        iteration.abadon = ["taskList","data"];
        iteration.projectID = -1;
        iteration.name = "";
        iteration.description = "";
        iteration.startDate = "";
        iteration.endDate = "";
        iteration.status = this.OPEN;
        iteration.taskList = [];
        iteration.data = {};

        return iteration;
    }
}

module.exports = Iteration;