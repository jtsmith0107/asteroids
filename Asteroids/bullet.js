(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Bullet = Asteroids.Bullet = function(pos, vel){
      Asteroids.MovingObject.call(this, pos, vel, this.RADIUS, this.COLOR);
  }
  
  Bullet.inherits(Asteroids.MovingObject);
  
  Bullet.prototype.RADIUS = 2;
  Bullet.prototype.COLOR = 'yellow';
  
  
})(this)