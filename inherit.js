// var Surrogate = function(){
//
// }
//
// Surrogate.prototype = SuperClass.prototype;
//
// Subclass.prot

Function.prototype.inherits = function(superClass){
  var sub = this;
  var Surrogate =  function(){};
  Surrogate.prototype = superClass.prototype;
  sub.prototype = new Surrogate();
  
}

var Animal = function () {}
Animal.prototype.growl = function() {
  console.log("grr");
}

var Dog = function () {}
Dog.inherits(Animal);
d = new Dog();
d.growl();

Dog.prototype.bark = function() {
  console.log('woof');
}

a = new Animal();
a.bark();