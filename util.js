Array.prototype.remove=function(dx){
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++){
　　　　if(this[i]!=this[dx]){
　　　　　　this[n++]=this[i]
　　　　}
　　}
　　this.length-=1
　};

Array.prototype.minus = arr=>{
    arr.forEach(element => {
        this.remove(element);
    });
};