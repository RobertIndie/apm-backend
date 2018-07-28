module.exports = {
    isValid ({start,end}){
        return new Date(Date.parse(start)) <= new Date(Date.parse(end));
    },
    isIncluded ({start1,end1},{start2,end2}){
        return new Date(Date.parse(start1))>=new Date(Date.parse(start2)) 
        && new Date(Date.parse(end1))<=new Date(Date.parse(end2));
    }
}