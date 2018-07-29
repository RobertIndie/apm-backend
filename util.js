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
    }
}