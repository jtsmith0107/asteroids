Function.prototype.inherits = function(superClass){
  var sub = this;
  var Surrogate =  function(){};
  Surrogate.prototype = superClass.prototype;
  sub.prototype = new Surrogate();

}
  
