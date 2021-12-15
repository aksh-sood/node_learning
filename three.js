var events =require('events');
var util=require('util');

// var something=new events.EventEmitter();
// something.on("onEvent",function(msg){console.log(msg);});
// something.emit("onEvent","this is an event");

var Person=function(name){
    this.name=name;
}

util.inherits(Person, events.EventEmitter);

var james= new Person('james');
var mey = new Person('mey');
var ryu= new Person('ryu');
var people= [james, mey, ryu];

people.forEach(function(person){
    person.on("speak",function(msg){console.log(person.name+" said: "+msg);});
});
james.emit("speak","he is great at coding");
mey.emit("speak","he is great at node");