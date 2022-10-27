var w = 800;
var h = 600;
//I've had to be carefull to not use phag as an abreviation for phagocyte
var wCellNo = 0;

var cells = [];

function setup() {     
  createCanvas(w, h);
  cells.push(new Cell(2));
  cells.push(new Cell(6));
  for (var i = 0; i < 10; i++){
  	cells.push(new Cell(random(1,3)))
  }
  // cells.push(new Cell(5,createVector(0,0)))
}

function draw() {
  background(0);

  for (var i=0; i<cells.length; i++){
    if (mouseIsPressed){
      var clickPos = createVector(mouseX, mouseY);
      var wind = p5.Vector.sub(cells[i].loc, clickPos).setMag(1);
      cells[i].applyForce(wind);
  	}
    var friction = cells[i].speed.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(0.03);
    cells[i].applyForce(friction);
    cells[i].run();
  }
}
//constructor for white blood cells, to destroy mutated cells.
//similar to the cell creation function.
//these will only chase their targets but also eat any mutated cells
//they run into
function Phagocyte(_target){
	this.speed = createVector(1,1);
	this.loc = createVector(random(w),random(h))
	this.acceleration = createVector(0, 0);
	this.mass = 5;
	this.diam = this.mass*10;
	this.target = _target;
	this.isFound = false;

	this.run = function(){
    this.draw();
    this.move();
    this.checkBorders();
    this.endHunt();
	}

  this.draw = function(){
  	//mass mechanics
  	this.mass -= 0.001;
  	this.diam = this.mass*10;

  	fill(255);
    ellipse(this.loc.x, this.loc.y, this.diam, this.diam);
  }

  this.move = function() {
  	targetPos = this.target.loc.copy()
  	//i know right! makes white blood cells hone in on infected cells
  	this.acceleration.add(p5.Vector.sub(this.target.loc,this.loc).setMag(0.1));
    this.speed.add(this.acceleration);
    this.loc.add(this.speed);
    this.acceleration.mult(0);
  }

  this.checkBorders = function() {     
    if (this.loc.x > width-this.diam/2) {
      this.loc.x = width-this.diam/2;
      this.speed.x *= -1;
    } else if (this.loc.x < this.diam/2) {
      this.speed.x *= -1;
      this.loc.x = this.diam/2;
    }
    if (this.loc.y > height-this.diam/2) {
      this.speed.y *= -1;
      this.loc.y = height-this.diam/2;
    }
     else if (this.loc.y < this.diam/2) {
      this.speed.y *= -1;
      this.loc.y = this.diam/2;
    }
  }

  this.applyForce = function(f) {
    var adjustedForce = f.copy();
    adjustedForce.div(this.mass);
    this.acceleration.add(adjustedForce);
  }

  this.endHunt = function() {
  	for (var i = 0; i < cells.length; i++){
  		if (cells[i].infected){
  		//check if an infected cell has been caught
			var pCent = p5.Vector.sub(this.loc,cells[i].loc).mag();
			var padding = (this.diam/2) + (cells[i].diam/2);
			if (pCent <= padding){
				this.isFound = true;
				if (this.diam > cells[i].diam){
					var targetIndex = cells.indexOf(cells[i]);
		  			cells.splice(targetIndex, 1);
		  			var ally = true

		  		} else {
					//add infected cell to the list
					var ally = false
					var goodGuyIndex = cells.indexOf(this);
					cells.splice(goodGuyIndex, 1);
					wCellNo -= 1;
	
				}
				this.newGoodCell(ally)
	 		}
 		}
 	}
 	//check if they can finally go home or not. If there
	//are still infections they will chose one
	//(whoever's first in the list) and hone in on it.
	iCanLeave = true
	for (var i = 0; i < cells.length; i++){
		if (cells[i].infected)
		{
			if (iCanLeave){
				this.target = cells[i];
			}
			iCanLeave = false;
		}
	}
	if (iCanLeave){
		this.mass -= 0.049;
		if(this.mass <=0.5){
			var goodGuyIndex = cells.indexOf(this);
			cells.splice(goodGuyIndex, 1);
			wCellNo -= 1;
		}
	}
  }


	this.newGoodCell = function(good){
		var newLoc = this.loc.copy();
	  	var tempCell = new Cell(this.mass/3, newLoc);
	  	if (!good){
	  		  tempCell.infected = true;
	  		  if (wCellNo < 5){
	  		  	cells.push(new Phagocyte(tempCell));
	  		  	wCellNo += 1;
	  		  }
	  	}
	  	//less likely to reproduce this way if there's loads of cells
	  	if (random(cells.length) < 20)
	  	cells.push(tempCell)
	}
}
function Cell(_m, _loc) {
  this.speed = createVector(random(-1,1), random(-1,1));
  this.loc = _loc || createVector(random(width), height / 2);
  this.acceleration = createVector(0, 0);
  this.mass = _m || 3;
  this.diam = this.mass * 10;
  this.intersections = false;
  this.maxMass = 6;
  this.agingRate = random(0.003 , 0.015)
  this.infected = false;
  this.phagocyte = false;

  this.run = function(){
    this.draw();
    this.move();
    this.checkBorders();
    this.checkCollisions();
    this.aging();
	}

  this.draw = function(){
    this.diam = this.mass * 10;

    //fill green if infected
    if (this.infected){
    	fill(0,255,0)
    } else {
        if (this.intersections){
        	fill(200,0,0);
        } else if (!this.intersections){
        	fill(125);
        }
    }
    ellipse(this.loc.x, this.loc.y, this.diam, this.diam);
  }

  this.move = function() {
    this.speed.add(this.acceleration);
    this.loc.add(this.speed);
    this.acceleration.mult(0);
  }

  this.checkBorders = function() {     
    if (this.loc.x > width-this.diam/2) {
      this.loc.x = width-this.diam/2;
      this.speed.x *= -1;
    } else if (this.loc.x < this.diam/2) {
      this.speed.x *= -1;
      this.loc.x = this.diam/2;
    }
    if (this.loc.y > height-this.diam/2) {
      this.speed.y *= -1;
      this.loc.y = height-this.diam/2;
    }
     else if (this.loc.y < this.diam/2) {
      this.speed.y *= -1;
      this.loc.y = this.diam/2;
    }
  }

  this.applyForce = function(f) {
    var adjustedForce = f.copy();
    adjustedForce.div(this.mass);
    this.acceleration.add(adjustedForce);
  }

  this.checkCollisions = function() {
  	this.intersections = false;
  	for (var i = 0; i < cells.length; i++){
  		if (this != cells[i]){
  			var dCent = p5.Vector.sub(this.loc,cells[i].loc).mag();
  			var padding = (this.diam/2) + (cells[i].diam/2);
  			if (dCent <= padding){
  				this.intersections = true;
  				
  				bounce = p5.Vector.sub(this.loc,cells[i].loc).setMag(0.8)
  				this.applyForce(bounce)
  			}
  		}
  	}
  }

  this.aging = function(){
  	this.mass += this.agingRate;
  	if (this.mass > this.maxMass){
  		var index = cells.indexOf(this);
  		cells.splice(index, 1);
  		
  		//(if (random(100)<56){) wont work for this project
  		if (random(cells.length) < 20){
  		  	cells.push(this.mitosis());
  			cells.push(this.mitosis());
  		}
  	}
  }

  this.mitosis = function(){
  	var newLoc = this.loc.copy();
  	//1 in 8 chance to mutate
  	var tempCell = new Cell(this.mass/3, newLoc);
  	if (random(8) < 1 || this.infected){
  		tempCell.infected = true;
  		if (wCellNo < 5){
  			cells.push(new Phagocyte(tempCell));
  			wCellNo += 1;
  		}
  	}
  	return(tempCell);
  }


}