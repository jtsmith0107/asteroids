
(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx.getContext("2d");
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship([this.DIM_X/2, this.DIM_Y/2], [0, 0])
    this.img = new Image();
    this.img.src = 'space.jpg'
  };
  
  Game.prototype.DIM_X = 1600;
  Game.prototype.DIM_Y = 1000;

  Game.prototype.addAsteroids = function(numAsteroids) {
    for (var i = 0; i < numAsteroids; i++){
      var a = Asteroids.Asteroid.randomAsteroid(this.DIM_X, this.DIM_Y);
      this.asteroids.push(a);
    }
  }
  
  Game.prototype.checkCollisions = function(){
    for(var i = 0 ; i < this.asteroids.length; i++){
      if(this.asteroids[i].isCollidedWith(this.ship)){
        alert("Gameover");
        this.stop();
      }
    }    
  }
  
  Game.prototype.hitAsteroid = function() {
    var hitAsteroids = [];
    for(var i = 0 ; i < this.bullets.length; i++){
      for(var j = 0; j < this.asteroids.length; j++){
        if(this.bullets[i].isCollidedWith(this.asteroids[j])) {
          hitAsteroids.push(j);
        }
      }
    }
    for(var i = 0; i < hitAsteroids.length; i++) {
      this.asteroids.splice(hitAsteroids[i], 1);
    }
  }
  
  Game.prototype.stop = function(){
    clearInterval(this.intervalId);
    //callback
  }
  
  Game.prototype.asteroidsOffCanvas = function(){
    for(var i = 0; i < this.asteroids.length; i++) {
      if (this.isOutOfBounds(this.asteroids[i])) {
        if(this.DIM_X < this.asteroids[i].posX){
          this.asteroids[i].posX = 0;
        } else if( 0 > this.asteroids[i].posX){
          this.asteroids[i].posX = this.DIM_X;
        }
        if(this.DIM_Y < this.asteroids[i].posY){
          this.asteroids[i].posY = 0;
        } else if( 0 > this.asteroids[i].posY){
          this.asteroids[i].posY = this.DIM_Y;
        }
      }
    }

  }
  
  Game.prototype.bulletsOffCanvas = function() {
    var bulletsToBeDeleted = [];
    for(var i = 0; i < this.bullets.length; i++) {
      if (this.isOutOfBounds(this.bullets[i])) {
        bulletsToBeDeleted.push(i);
      }
    }
    for(var i = 0; i < bulletsToBeDeleted.length; i++) {
      this.bullets.splice(bulletsToBeDeleted[i],1);
    }
  }
  
  Game.prototype.shipOffCanvas = function() {
    if (this.isOutOfBounds(this.ship)) {
      if(this.DIM_X < this.ship.posX){
        this.ship.posX = 0;
      } else if( 0 > this.ship.posX){
        this.ship.posX = this.DIM_X;
      }
      if(this.DIM_Y < this.ship.posY){
        this.ship.posY = 0;
      } else if( 0 > this.ship.posY){
        this.ship.posY = this.DIM_Y;
      }    
    }
  }
  

  
  Game.prototype.isOutOfBounds = function(obj){
    return obj.posX < 0 || obj.posX > this.DIM_X 
    || obj.posY < 0 || obj.posY > this.DIM_Y ;
  }
  
  Game.prototype.draw = function() {
    var that = this;
    // this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(that.ctx);
    })
    this.bullets.forEach(function(bullet) {
      bullet.draw(that.ctx);
    })
    this.ship.draw(this.ctx);
  }

  Game.prototype.move = function(){
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    })
    this.ship.move();
    this.bullets.forEach(function(bullet) {
      bullet.move();
    })
  }
  
  Game.prototype.bindKeyHandlers = function(){
    var that = this;
    key('w', function(){
      that.ship.power([0, -0.4]);
    })
    key('s', function(){
      that.ship.power([0, 0.4])
    })
    key('a', function(){
      that.ship.power([-0.4, 0])
    })
    key('d', function(){
      that.ship.power([0.4, 0])
    })
    key('space', function(){
      that.fireBullet();
    })
  }
  
  Game.prototype.addPotentialAsteroid = function(){
    if(Math.floor(Math.random() * 500) == 300){
      this.addAsteroids(1);
    } 
  }
  
  
  Game.prototype.fireBullet = function() {
    this.bullets.push(this.ship.fireBullet());
  }
  
  Game.prototype.step = function(){
    this.ctx.drawImage(this.img, 0, 0);
    
    this.move();
    this.draw();
    
    this.asteroidsOffCanvas();
    this.bulletsOffCanvas();
    this.shipOffCanvas();
    
    this.checkCollisions();
    this.hitAsteroid();
    this.addPotentialAsteroid();
  }
  
  Game.prototype.FPS = 30
  
  
  Game.prototype.drawBackground = function() {
    var that = this;
    this.img.onload = function() {
      that.ctx.drawImage(this.img, 0, 0);
    };
  }
  
 
  
  Game.prototype.intervalId = undefined;
  
  Game.prototype.start = function() {
    this.intervalId = setInterval(this.step.bind(this), this.FPS); 
    this.addAsteroids(8);
    this.bindKeyHandlers();
    this.drawBackground();
    
  }

})(this)