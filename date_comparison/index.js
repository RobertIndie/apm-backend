module.exports = {
    ERROR: -2,
    GREATE_THAN: 1,
    EQUAL: 0,
    LESS_THAN: -1,
    compare (date1,date2) {
        var timestamp1 = Date.parse(date1);
        var timestamp2 = Date.parse(date2);
        if(timestamp1 === NaN && timestamp2 === NaN){
            return this.ERROR;
        }
        if(timestamp1>timestamp2)return this.GREATE_THAN;
        if(timestamp1===timestamp2)return this.EQUAL;
        if(timestamp1<timestamp2)return this.LESS_THAN;
    }
}