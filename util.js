module.exports = {
    arrayMinus (a,b) {
        b.forEach(element => {
            if(this.isInArray(a,element));
            a.splice(i,1);
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
        for(var field in o){
            result.push(field);
            result.push(o[field]);
        }
        return result;
    },
    sleep (ms) {
        return new Promise(resolve => setTimeout(resolve,ms));
    }
}