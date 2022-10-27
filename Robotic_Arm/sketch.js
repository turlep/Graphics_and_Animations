var fSizes = [[55,160,55], [55,200,55], [55,240,55], [55,200,55], [55,140,55]];
var palmSize = [240,200,55];
var armSize = [170,300,55];
var fingerSpacing = 63;
var maxAngle = 60;
var bendAngle

var fOffSetX = 26;

function phalanx(w,h,d,bend){
	//maximum angle... duhh
	var maxAngle = 60;

	translate(0,-h/2,exDist*2)//bend*maxAngle/2);

	var jRad = 5;
	sphere(jRad*2)
	var exDist = jRad*bend*2

	rotateX(bend*radians(maxAngle));
	box(w,h,d);
}

function finger(w,h,d,bend){

	//bend will be between 0 and 1
	bend = min(bend,1)
	bend = max(bend,0)

	push()
		phalanx(w,h*0.5,d,bend);
		translate(0,-h*0.25-bend*3.5,bend*20);
		phalanx(w,h*0.3,d,bend);
		translate(0,-h*0.15-bend*6.5,bend*20);
		phalanx(w,h*0.2,d,bend);
	pop()
}

function palm(w,h,d,bend){
	push()
	translate(0,-h/2,bend*2)
	box(w,h,d);
	pop()
}

function hand(bend){

	push();
	rotateX(bend*radians(maxAngle));

	//palm

	var moveVal = bend;
	if (moveVal < 0){
		moveVal = 0
	}

	palm(palmSize[0],palmSize[1],palmSize[2],moveVal)

	//fingers
	push();
	translate(fOffSetX-palmSize[0]/2,-palmSize[1],palmSize[2]*bend);
	for (var i=1;i<5;i++){
		finger(fSizes[i][0],fSizes[i][1],fSizes[i][2],bend*i)
		translate(fingerSpacing,0,0)
	}
	pop();
	//thumb
	push()
	translate(-palmSize[0]/2,fSizes[0][1]-palmSize[1],palmSize[2]/2)
	rotateX(HALF_PI*15/10)
	rotateY(-PI*138/8)
	rotateZ(HALF_PI*55/20)
	finger(fSizes[0][0],fSizes[0][1],fSizes[0][2],bend)
	pop()
	pop()
}

function arm(){
	push()
	translate(0, palmSize[1]*3/2)
	box(palmSize[0]-50,3*palmSize[1],palmSize[2])

	//added 2nd part of the arm
	push()
	translate(0,1.5*palmSize[1]-30,2*palmSize[1]-30)
		rotateX(radians(80))
		box(palmSize[0]-50,4*palmSize[1],palmSize[2])
	pop()
}

function body(){
	//creates body in correct location.
	push()
	rotateX(radians(20))

	translate(0,palmSize[1]*5.5-120,palmSize[1]*5.8)
	box(palmSize[0]*1.5,8*palmSize[1],3*palmSize[1])
	head()
	pop()
}

function head(){
	push()
	translate(40,-1100,30)
	box(palmSize[0]*1.4,2*palmSize[1],1.5*palmSize[1])
	face()
	pop()
}

function face(){
	push()
	//eyes
	translate(190,-110,-70)
	sphere(20)
	translate(0,0,150)
	sphere(20)
	//nose
	translate(0,100,-75)
	box(60)
	pop()
}

function setup(){     
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw(){  
	background(125);

	//camera
	rotateY(sin(frameCount/100));
	rotateZ(sin(frameCount/100));
	scale(0.3)

	//the 'abs' is redundant. I played around
	//with this a little but decided to leave it
	bendAngle = (sin(frameCount/60)+1)/2;

	push()
		rotateY(-abs(sin(frameCount/70)))

		hand(bendAngle);
		arm()
	pop()

	body()

	//I wanted to make the entire body move but
	//having made it in this order it would be
	//difficult. I would have called arm from body,
	// palm from arm, etc

}     

