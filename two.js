var lgth=function(arr){
    return "there are " + arr.length+" elements";
};
var add=function(a,b){
    return `the sum of the number is ${a+b}`;
};
var pi = 3.14;
// module.exports.lgth=lgth;
// module.exports.add=add;
module.exports={
    lgth:lgth,
    add:add,
    pi:pi,
}