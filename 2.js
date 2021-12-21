//exports type 1
const Calculator = require("./four");
const cal = new Calculator(5, 9);

console.log(cal.add());
console.log(cal.multiply());

//exports type 2
const cal2 = require("./five");
console.log(cal2.add(5, 9));
console.log(cal2.multiply(5, 9));
console.log(parseInt(cal2.divide(5, 9).toPrecision(1)));
console.log(parseFloat(cal2.divide(5, 9).toPrecision(3)));
console.log(cal2.divide(5, 9).toPrecision(3));

//exports type 3
const { add, divide } = require("./five");
console.log(add(8, 9));
console.log(parseInt(divide(8, 9).toPrecision(1)));
console.log(parseFloat(divide(8, 9).toPrecision(3)));
console.log(divide(8, 9).toPrecision(3));

//caching
require("./six.js")();
require("./six.js")();
require("./six.js")();
