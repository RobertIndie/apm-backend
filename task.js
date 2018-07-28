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
        task.abadon = [];
        task.iterationID = -1;
        task.name = "";
        task.description = "";
        task.developerList = [];
        task.status = this.PLANNING;
        task.priority = this.HIGH;
        task.deadline = "";
    }
}