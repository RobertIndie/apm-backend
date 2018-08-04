module.exports = {
    load(o,source){
        for(var i=0;i<source.length;i++){
            if(o.metadata.arrayField.indexOf(o.metadata.getDatabaseField[i])!==-1){
                o[o.metadata.getDatabaseField[i]] = JSON.parse(source[i]);
            }
            else if(o.metadata.objField.indexOf(o.metadata.getDatabaseField[i])!==-1){
                o[o.metadata.getDatabaseField[i]] = JSON.parse(source[i]);
            }
            else {
                o[o.metadata.getDatabaseField[i]] = source[i];
            }
        }
        o.metadata = undefined;
        return o;
    }
};