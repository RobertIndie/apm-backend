module.exports = {
    arrayMinus (a,b) {
        b.forEach(element => {
            for(var i=0;i<a.length;i++){
                if(a[i]===element){
                    a.splice(i,1);
                    break;
                }
            }
        });
        return a;
    },
    isInArray(array,element){
        for(var i=0;i<array.length;i++){
            if(array[i]===element){
                return true;
            }
        }
        return false;
    },
    fieldAndValuePack (o) {
        var result = [];
        if(o.metadata!==undefined){
            if(o.metadata.database!==undefined){
                o.metadata.database.forEach(element => {
                    if(!(element in o)){
                        o[element] = "";
                    }
                });
            }
            if(o.metadata.arrayField!==undefined){
                o.metadata.arrayField.forEach(element => {
                    if(!(element in o)){
                        o[element] = "[]";
                    }
                });
            }
            if(o.metadata.objField!==undefined){
                o.metadata.arrayField.forEach(element => {
                    if(!(element in o)){
                        o[element] = "{}";
                    }
                });
            }
        }
        for(var field in o){
            if(field==='metadata')continue;
            result.push(field);
            result.push(o[field]);
        }
        return result;
    },
    sleep (ms) {
        return new Promise(resolve => setTimeout(resolve,ms));
    }
}