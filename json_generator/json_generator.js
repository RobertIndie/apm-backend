module.exports = {
    object: {
        abandon: []
    },
    toStr(o){
        var temp = {};
        for(var field in o)if(field!=="abandon"){
            o.abandon.forEach(element => {
                if(element!==field){
                    temp[field] = o[field];
                }
            });
        }
        return JSON.stringify(temp);
    }
};