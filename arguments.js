var sum = function(){
  var args = Array.prototype.slice.call(arguments);
  var sum = 0;
  args.forEach(function(arg){
    sum += arg;
  })
  return sum;
}

console.log(sum(1, 2, 3, 4));
console.log(sum(1, 2, 3, 4, 5));

Function.prototype.myBind = function(context){
  var that = this;
  var args = Array.prototype.slice.call(arguments, 1);
  return function(){
    args = args.concat(Array.prototype.slice.call(arguments))
    return that.apply(context, args);
  }
}

myObj = {name: "Bob"};
myFunction = function(){
  var args = Array.prototype.slice.call(arguments);
  console.log(args);
}

var myBoundFunction = myFunction.myBind(myObj, 1, 2);

myBoundFunction(3); // myObj.myFunction(1, 2, 3)

var curriedSum = function(numOfArgs) {
  var numbers = [];
  var args = Array.prototype.slice.call(arguments);
  var _curriedSum = function(num){
    numbers.push(num);
    if (numbers.length == numOfArgs) {
      var sum = 0
      numbers.forEach( function(num) {
        sum += num;
      })
      return sum;
    } else {
      return _curriedSum;
    }
  };
   return _curriedSum;
}

var sum = curriedSum(4);
console.log(sum(5)(30)(20)(1));

var sum2 = curriedSum(4);
var f = sum2(3)(3)(3);
console.log(f);
// f(3) == 12
console.log(f(3));

Function.prototype.curry = function(numArgs){
  var args = Array.prototype.slice.call(arguments);
  var that = this;
  if(args.length < numArgs){
    console.log(that);
    return function() {
      return that.apply(this, args)
    };
  }
  else {
    return that.apply(this, args);
  }
}

Function.prototype.curry = function(numArgs) {
  var arg_array = [];
  var that = this;
  var _curry =  function (arg) {
    arg_array.push(arg)
    if (arg_array.length == numArgs) {
      return that.apply(null, arg_array);
  } else {
    return _curry;
  }
  }
  return _curry    
}

var multiply = function(a,b,c,d){
  return a * b * c * d;
}
// console.log(multiply(2,2,2,2));
c = multiply.curry(4);
d = multiply.curry(4);
curried  = d(2)(2)(2);
console.log(c(2)(2)(2)(4));
console.log(curried(2));