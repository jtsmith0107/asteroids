(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Ship = Asteroids.Ship = function(pos,vel) {
    Asteroids.MovingObject.call(this, pos, vel, this.RADIUS, this.COLOR)
  }
  
  Ship.inherits(Asteroids.MovingObject);
  
  Ship.prototype.COLOR = 'red';
  Ship.prototype.RADIUS = 10;
  
  Ship.prototype.power = function(impulse) {
    var speed = Math.sqrt(Math.pow(this.velX, 2) + Math.pow(this.velY, 2));
    if(speed < 15){
      this.velX += impulse[0];
      this.velY += impulse[1];
    }
  }
  
  Ship.prototype.move = function() {
  this.posX += this.velX;
  this.posY += this.velY;
  this.velX *= 0.97 
  this.velY *= 0.97
}
  
  Ship.prototype.fireBullet = function(){
    var speed = Math.sqrt(Math.pow(this.velX, 2) + Math.pow(this.velY, 2))
    var dirX =  this.velX / speed
    var dirY = this.velY / speed
    
    return new Asteroids.Bullet([this.posX,this.posY], [ dirX * 5, dirY * 5]);
  }
  
})(this);

