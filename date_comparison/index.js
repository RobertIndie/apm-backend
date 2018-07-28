module.exports = {
    isValid ({begin,end}){
        return begin <= end;
    },
    isIncluded ({begin1,end1},{begin2,end2}){
        return begin1>=begin2 && end1<=end2;
    }
}