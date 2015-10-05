var systems;
var start;
var vals = ["0", "1"];
//, "01","00", "11", "10"];

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('processing');
  systems = [];
  start = true;
}

function draw() {
  background(0);
  for (i = 0; i < systems.length; i++) {
    systems[i].run();
    if (systems[i].donezo == true) {
      systems.splice(i, 1);
    }
  }
    drawText();
}

function drawText() {
    stroke(255);
    //line(width/2, 0+height/8, width/2, height);
    textSize(42);
    fill(40, 184, 255);
    textFont("Anonymous Pro");
    textAlign(CENTER);
    text("Quantified Self Art and Theater Experience", width/2, height/2);
    textSize(32);
    text("Are you your data?", width/2, height/1.5);
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseMoved() {
  if (start == true && random() > .5 ) {
    this.p = new BinarySystem(createVector(mouseX, mouseY));
    systems.push(p);
    p.addBinary();
  }
}

function touchMoved() {
  if (start == true && random() > .5 ) {
    this.p = new BinarySystem(createVector(mouseX, mouseY));
    systems.push(p);
    p.addBinary();
  }
}

function mouseClicked() {
  if (start == false) {
    this.p = new BinarySystem(createVector(mouseX, mouseY));
    systems.push(p);
    p.addBinary();
  }
  start = true;
}

// A simple Particle class
var Binary = function(position, repr) {
  this.velocity = createVector(random(-5, 5), random(-5, 5));
  this.position = position.copy();
  this.lifespan = 100.0;
  this.repr = repr;
  

  // if (random() > .5){
  //   this.repr = "0";
  // } else {
  //   this.repr = "1";
  // }
};

Binary.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Binary.prototype.update = function(){
  if (random() > .5){
    this.position.x += this.velocity.x;
  } else{
    this.position.y += this.velocity.y;
  }
  this.lifespan -= 1;
};

// Method to display
Binary.prototype.display = function () {
  textSize(24);
  fill(135, 192, 232, this.lifespan);
  text(this.repr, this.position.x, this.position.y);
};

// Is the particle still useful?
Binary.prototype.isDead = function () {
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var BinarySystem = function (position) {
  this.origin = position.copy();
  this.bits = [];
  this.donezo = false;
};

BinarySystem.prototype.addBinary = function () {
    p = new Binary(this.origin, vals[floor(random() * vals.length)]);
    this.bits.push(p);
};

BinarySystem.prototype.run = function () {
  for (var i = this.bits.length - 1; i >= 0; i--) {
    var p = this.bits[i];
    p.run();
    if (p.isDead()) {
      this.bits.splice(i, 1);
    }
  }
};

// A subclass of Particle
/*
function CrazyParticle(origin) {
  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  Particle.call(this, origin);

  // Initialize our added properties
  this.theta = 0.0;
};

// Create a Crazy.prototype object that inherits from Particle.prototype.
// Note: A common error here is to use "new Particle()" to create the
// Crazy.prototype. That's incorrect for several reasons, not least 
// that we don't have anything to give Particle for the "origin" 
// argument. The correct place to call Particle is above, where we call 
// it from Crazy.
CrazyParticle.prototype = Object.create(Particle.prototype); // See note below

// Set the "constructor" property to refer to CrazyParticle
CrazyParticle.prototype.constructor = CrazyParticle;

// Notice we don't have the method run() here; it is inherited from Particle

// This update() method overrides the parent class update() method
CrazyParticle.prototype.update=function() {
  Particle.prototype.update.call(this);
  // Increment rotation based on horizontal velocity
  this.theta += (this.velocity.x * this.velocity.mag()) / 10.0;
}

// This display() method overrides the parent class display() method
CrazyParticle.prototype.display=function() {
  // Render the ellipse just like in a regular particle
  Particle.prototype.display.call(this);
  // Then add a rotating line
  push();
  translate(this.position.x, this.position.y);
  rotate(this.theta);
  stroke(255,this.lifespan);
  line(0,0,25,0);
  pop();
}
*/
