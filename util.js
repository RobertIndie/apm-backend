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