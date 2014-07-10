
(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius){
      Asteroids.MovingObject.call(this, pos, vel, radius, this.COLOR);
  }
  
  Asteroid.inherits(Asteroids.MovingObject);
  
  Asteroid.prototype.COLOR = 'white';

  Asteroid.prototype.RADIUS = 20
  
  Asteroid.randomAsteroid = function (dimX, dimY) {
    var px = Math.random() * dimX;
    var py = Math.random() * dimY;
    var vx = Math.random() * 10 - 5;
    var vy = Math.random() * 10 - 5;
    var rad = Math.random() * 30 + 5;
    return new Asteroid([px, py], [vx, vy], rad);
  }
  
  
  
  
})(this)