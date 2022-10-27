/*

Put your creative rationale in a comment here. 

	I wanted to randomly generate 3d terrain using noise. 

 - What effect were you trying to achieve?

 	In this project I tried to create a randomly generated terrain. 
 	I ended up running into quite a few problems, largely in regards to p5js 
 	not being a great language for graphics work but also relating to my laptop 
 	not being excessively powerful. 
 	I tried to simulate flight over this terrain, with differing 
 	landscapes over time.


 - How does your code do this?

 	Using a Triangle-Strip I simulated a plain and 
 	gave it shape using a 2d noise field. I set the fill 
 	relative to the height of each point and made 'lakes'
 	below a certain height, checking all 4 vertices are below a 
 	certain threshold. As the sketch runs, the octaves and 
 	amplitude change with time simulating different terrains.

 	NOTE: Just before the hand in I realised that you only 
 	wanted a sketch of 512 by 512, so I had to modify my 
 	sketch accordingly.


 - What are you happy with ? What could be improved ?

	I initially made a 2d noise texture and wanted to use it to 
	'texture' a 3d generated noise field. 
 	It turns out that this is impossible without writing my own shader 
 	(in c, which I cannot do) or taking someone elses (which I do not want to do) 
 	and so I have left the code for a 2d noise pattern commented out at the bottom of my sketch. 
 	if you want you can uncomment it to run it (I have left instructions).

 	If it were posible I would have made smaller sections to fill 
 	so that the water would move more smoothly. 
 	I would also have found ways for the frequency(octaves) 
 	and amplitude(falloff) to change based on the space they are in, 
 	as opposed to time, to create a more natural landscape. 
	Fortunately, because of the speed of 'flight', 
	this is not immediately obvious.

	As a whole, though it is imperfect, I am incredibly happy 
	with what I have made. I feel it is what I set out to make 
	and has turned out reasonably well. 
	I have also learnt some basics of webGL for the first time. 

*/

var w = 512;
var h = 512;
var cols, rows;
var scl = 15;
var flyPos = 0;

var falloff = 0;
var powerOf = 1;
var octave = 16;

var fallInc = 0.001;
var powInc = 0.01;


//variables for 2d noise texture - unused
var xInc = 0.005;
var yInc = 0.005;



function preload(){
}


function setup(){
	createCanvas(w,h,WEBGL);
	// setAttributes('preserveDrawingBuffer', true)

	stroke(255);
	strokeWeight(1)
	// noFill();


	cols = floor(width/scl);
	rows = floor(height/scl);
}

function draw() {

	background(0);
	// ambientLight(255,255,100)

	//octaves, falloff/ amplitude
	noiseDetail(octave,falloff);


	flyPos -= 0.08;

	//fills zList with a list of 'height' values for each vertex
	//-100 < zList[x][y] < 100
	var yOff = 0;
	zList = [];
	for (var y = 0; y < rows+1; y++) {
		var xOff = flyPos;
		var tempList = [];
		for (var x = 0; x < cols; x++) {
			append(tempList, map(noise(xOff,yOff),0,1,-100,100))
			xOff += 0.2
		}
		yOff += 0.2
		append(zList,tempList)
	}
		translate(-w/2,-h/3,-h/2)
		rotateX(Math.PI/3)

	//create triangle stip
	for (var y = 0; y < rows; y++) {
		beginShape(TRIANGLE_STRIP)
		for (var x = 0; x < cols; x++) {


			//select the colour depending on the height
			var heightCol = map(zList[x][y],-100,100,0,255)
			fill(heightCol/2,235-heightCol,125-heightCol)

			//shallow water - light blue
			if (zList[x][y] < -60 && zList[x+1][y] < -60 &&
			zList[x][y+1] < -60 && zList[x+1][y+1] < -60){

				fill(0,0,255)
			}
			// deep water - dark blue
			if (zList[x][y] < -70 && zList[x+1][y] < -70 &&
			zList[x][y+1] < -70 && zList[x+1][y+1] < -70){
			fill(0,0,100)
			}

			//draw vertexes
			vertex((x)*scl,y*scl,zList[x][y])
			vertex((x+1)*scl,y*scl,zList[x+1][y])

			vertex((x)*scl,(y+1)*scl,zList[x][y+1])
			vertex((x+1)*scl,(y+1)*scl,zList[x+1][y+1])

			
		}
		endShape()
	}

	// incremental non-offset values

		//maximum value for the falloff is 0.5, as anything higher
		//looks mildly satanic. Passing 0 makes setch 'jump'
		//EDIT: changed to point 4 to reduce 'too much mountain' issue. 
		falloff += fallInc
		if (falloff >= 0.4 || falloff <= 0){
			fallInc *= -1;
		}

		// powerOf does not pass 0 as a frequency of 1
		// seems to shift my entire sketch. The frequency
		// doubles with each increment, as in a change in octave
		powerOf += powInc
		octave = 2**powerOf;
		if (powerOf >= 6 || powerOf <= 1){
			powInc *= -1;
		}



	//unuseable with webGL - 2d noise graphic, 
	//to run uncomment: setAttributes, 
	//the code above, and WEBGL from the canvas

	// var yOff = 0;
	// loadPixels();
	//  for (var y = 0; y < height; y++) {
	//  	var xOff  = 0;
	//  	for (var x = 0; x < width; x++) {
	//  		var index = (x + y * width) * 4
	//  		var r = noise(xOff, yOff) * 255
	//  		pixels[index+0] = r
	//  		pixels[index+1] = r
	//  		pixels[index+2] = r
	//  		pixels[index+3] = 255
	//  		xOff += xInc;
	//  	}
	//  	yOff += yInc
	//  }
	// updatePixels();
}