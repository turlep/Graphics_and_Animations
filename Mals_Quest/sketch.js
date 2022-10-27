//background objects
	var floorY;
	var houseX;
	var houseY;
	var mountains;
	var trees;
	var gravity;
	var clouds;

	//more important objects
	var edie;
	var fairies;
	var holes;
	var enemies;

	//states or things
	var scrollPos;
	var fairiesGot;
	var isWon;
	var isLost;
	var lives;

	//character position
	var malXscreen;
	var	malXmap;
	var malY;
	var malSpeed;
	var jumpVelocity;

	//character state
	var isLeft;
	var isRight;
	var isJumping;
	var isFalling;
	var isOnPlatform;
	var otherFloor;


function setup()
{
	rorateNumber = 0
	//ordered as above
	    createCanvas(1024,576);
	    floorY = height*18/20;
	    houseX = [-2600,300,2700];
	    houseY = height*17/20;
	    gravity = 0.981
	   	jumpVelocity = 16;

	   	isWon = false;
	   	isLost = false;
	   	lives = 3;
	   	isOnPlatform = false;


	startGame()
}

function startGame()
{
	scrollPos = 0;
   	fairiesGot = 0;

	fairies = []
	for (var i = 0; i < 10; i++)
	{
		var f = {
				xPos: random(width+i*width, width+2*i*width),
				yPos: random(height*17/20,height*12/20), 
				size: 10, 
				centCol: randCol(), 
				auraCol: randCol(), 
				isFound: false
				}
		fairies.push(f)

		
	}


	//background objects
    mountains = []
    for (var i = 0; i < 10; i++)
	{
		var m = {
				xPos: random(-2*width, 4*width),
				height: height/2,
				base: height*3/4,
				style: 1
				}
		mountains.push(m)
	}

    trees = []
    for (var i = 0; i < 10; i++)
	{
		var t = {
				xPos: random(-width, 2*width),
				base: random(height*16/20,height*15/20),
				style: 1
				}
		trees.push(t)
	}

	clouds = []
    for (var i = 0; i < 5; i++)
	{
		var c = {
				xPos: random(-1*width, 2*width),
				yPos: random(height/20,height/15),
				style: 1
				}
		clouds.push(c)
	}

	
	holes = []
    for (var i = 0; i < 10; i++)
	{
		var h = {
				xPos: random(i*width, 2*i*width),
				width: 100
				}
		holes.push(h)
	}

	edie = {xPos: malXscreen-30,
			yPos: malY-40,
			size: 20,
			centCol: [10,10,255], 
			auraCol: [250,150]
			}

    //mal start position
	    malXscreen = 500;
	    malY = floorY;
	    malSpeed = 10;

    //character state variables
	    isLeft = false;
		isRight = false;
		isJumping = false;
		isFalling = false;

	//enemy list
		enemies = []
		for (i = 0; i < 20; i++)
		{
			enemies.push(
			{
		        xPos: random(i*width, 2*i*width),
		        yPos: floorY-10,
		        timer: 0,
		        size: 30,
		        speed: 2,
		        chewSpeed: 1,
		        mouthSize: 15,
		        display: function()
		        {	
		            // Draw enemy body
		            	fill([255, 0, 255]);
		            ellipse(this.xPos, this.yPos, this.size);

		            //left animation
					if (this.speed > 0)
					{
						//wing
						fill(255,255,0);
						triangle(this.xPos-10,this.yPos-20, this.xPos-30,this.yPos-40, this.xPos-5,this.yPos-10);

						//mouth right to left orb
						fill(50,0,50);
			            ellipse(this.xPos+11, this.yPos+3, 8, this.mouthSize); 
						ellipse(this.xPos+4, this.yPos+4, 8, this.mouthSize-4); 
						ellipse(this.xPos-3, this.yPos+5, 8, this.mouthSize-8);	
					}

					//right animation
					else
					{
		            	//wing
						fill(255,255,0); 
						triangle(this.xPos+10,this.yPos-20, this.xPos+30,this.yPos-40, this.xPos+5,this.yPos-10); 

						//mouth left to right orb
							fill(50,0,50); 
			            ellipse(this.xPos-11, this.yPos+3, 8, this.mouthSize); 
						ellipse(this.xPos-4, this.yPos+4, 8, this.mouthSize-4); 
						ellipse(this.xPos+3, this.yPos+5, 8, this.mouthSize-8); 
					}
					
			        chewLimit1 = this.size /3; 
			        chewLimit2 = this.size /1.5; 
		            this.mouthSize += this.chewSpeed; 
		            if (this.mouthSize >= chewLimit2 || this.mouthSize <= chewLimit1)
		            {
		            	this.chewSpeed = -this.chewSpeed; 
		            }
		        },
		        move: function()
		        {
		        	this.timer += 1
		        	this.xPos += this.speed; 
		        	if (this.timer%200 == 0)
		        	{
		        		this.speed = -this.speed; 
		        	}
		        },
		        checkCollision: function()
		        {
					if ( (malXmap > this.xPos - this.size/2) && (malXmap < this.xPos + this.size/2) && 
						(malY > this.yPos - this.size/2) && (malY < this.yPos + this.size/2) )
					{
						isFalling = true;
					}
					
				}
			}
			);
		}
		console.log(jumpVelocity)
	//platforms list
		platforms = [];
		for (i = 0; i < 20; i++)
		{
			platforms.push(
		    {
		        xPos: random(i*width, 2*i*width),
		        yPos: floorY - 110,
		        width: 200,
		        height: 15,
		        display: function()
		        {
		            // Draw platform.
		            fill([255, 255, 0]); 
		            rect(this.xPos, this.yPos, this.width, this.height); 
		            line(this.xPos,
		                 this.yPos + this.height / 2,
		                 this.xPos + this.width,
		                 this.yPos + this.height / 2); 
		        },
		        checkMalOn: function()
		        {
		        	if ( (malXmap > this.xPos && malXmap < this.xPos + this.width) && (malY <= this.yPos + 50 && malY >=this.yPos) && (jumpVelocity <= 0 || jumpVelocity == 16) )
		        	{
		        		isOnPlatform = true; 
		        		otherFloor = this.yPos; 
		        	}
		        }
		    }
		);
	}
}

function malControls()
{
	isRight = keyIsDown(RIGHT_ARROW);
	isLeft = keyIsDown(LEFT_ARROW);

	malXmap = malXscreen - scrollPos;

	//jump and land mechanics
		if (isJumping)
		{
			malY -= jumpVelocity;
			jumpVelocity -= gravity;

			if (malY >= floorY)
			{
				malY = floorY;
				isJumping = false;

				if (!isFalling)
				{
					jumpVelocity = 16;
				}
			}
			else if (isOnPlatform)
			{
				if (malY >= otherFloor)
				{
					malY = otherFloor;
					isJumping = false;
					jumpVelocity = 16;
				}
			}

		//animation select - jumping, then not
			if (isLeft)
			{
				malLeftJump();
			}
			else if (isRight)
			{
				malRightJump();
			}
			else
			{
				malIdleJump();
			}
		}

		else if (isLeft)
		{
			malLeft();
		}

		else if (isRight)
		{
			malRight();
		}

		else
		{
			malIdle();
		}

	//L + R Movements
		if (isLeft)
		{
			if (malXscreen > 0.4*width)
			{
				malXscreen -= malSpeed;
			}
			else
			{
				scrollPos += malSpeed;
			}
		}
		if (isRight)
		{
			if (malXscreen < 0.6*width)
			{
				malXscreen += malSpeed;
			}
			else
			{
				scrollPos -= malSpeed;
			}
		}


	// HOLY SHIT THIS IS HIDEOUS FIX IT PLEASE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1


	//platforms and falling mechanics (almost definitely need to remove some other falling mechanics)
	//also, hacky as shit.. using jumpVelocity to make it work
		//change later to factor in acceleration - general fall mechanics, also maybe remove something else somewhere else
		if (!isOnPlatform && malY<floorY && !isJumping)
		{
			malY += gravity* 10;

			if (malY >= floorY)
			{
				malY = floorY;
				isJumping = false;

				if (!isFalling)
				{
					jumpVelocity = 16;
				}
			}
		}
}

function keyPressed()
{
	//space = jump
	if ( (keyCode === 32) && (malY == floorY || isOnPlatform) )
	{
		isJumping = true
	}

	//if game over, next level
	if(isLost || isWon)
	{
	    if(key == ' ')
	    {
	        nextLevel();
	    }
	    return;
	}
}

function malIdle()
{
	//feet
	fill(200,0,0);
	triangle(malXscreen-5,malY-10,malXscreen-15,malY,malXscreen-1,malY);
	triangle(malXscreen+6,malY-10,malXscreen+2,malY,malXscreen+16,malY);

    //robe
    fill(0);
    rect(malXscreen-11,malY-48,23,30);
    triangle(malXscreen-1,malY-23,malXscreen-13,malY-58,malXscreen+12,malY-59);
    quad(malXscreen-11, malY-18, malXscreen+12, malY-18, malXscreen+19,malY-(135-132), malXscreen+(-45+24), malY-(135-134));

    //head
    fill(40,30,10);
    ellipse(malXscreen-1,malY-58,20,25);
	triangle(malXscreen-2,malY-(135-97),malXscreen+(-45+40),malY-(135-85),malXscreen+(-45+48),malY-(135-85));

    //belt
    fill(255,0,0);
    ellipse(malXscreen+(-45+46),malY-(135-114),26,15);
    fill(0);
    ellipse(malXscreen+(-45+46),malY-(135-111),22,15);
}

function malLeft()
{

	translate(malXscreen-45,malY-335);

	//feet
	fill(200,0,0);
	triangle(37,328,42,337,25,336);
	triangle(53,325,43,339,57,335);

	//robe
	fill(0);
	rect(40,287,14,30);
	triangle(40,290,54,317,36,317);
	quad(54,317,35,317,30,332,66,336);

	//head
    fill(40,30,10);
    ellipse(42,278,20,25);

	//collar
	fill(0);
	triangle(40,312,58,277,46,276);

    //belt
    fill(255,0,0);
    ellipse(45,314,21,15);
    fill(0);
    ellipse(45,311,18,15);

	translate(45-malXscreen,335-malY);
}

function malRight()
{
	translate(malXscreen-245,malY-335);

	//feet
	fill(200,0,0);
	triangle(237,325,247,339,233,335);
	triangle(253,328,248,337,265,336);

	//robe
	fill(0);
	rect(236,287,14,30);
	triangle(250,290,236,317,254,317);
	quad(236,317,255,317,260,332,224,336);

	//head
    fill(40,30,10);
    ellipse(248,278,20,25);

	//collar
	fill(0);
	triangle(250,312,232,277,244,276);

    //belt
    fill(255,0,0);
    ellipse(245,314,21,15);
    fill(0);
    ellipse(245,311,18,15);


	translate(245-malXscreen,335-malY);
}

function malIdleJump()
{

	translate(malXscreen-245,malY-135);

	//feet
	fill(200,0,0);
	triangle(240,125,230,139,244,135);
	triangle(251,125,247,135,261,139);

    //robe
    fill(0);
    rect(235,87,20,30);
    triangle(244,112,232,77,257,76);
    quad(234,117,257,117,264,132,224,134)

    //head
    fill(40,30,10);
    ellipse(244,73,20,25);
	triangle(243,97,240,85,248,85);

	//arms
 	stroke(0);
    strokeWeight(6);

    // left
    line(240,100,231,66);
    line(240,106,231,66);

    //right
    line(252,100,256,68);

    //reset parametres - post arms
    strokeWeight(1);
    noStroke();

    //belt
    fill(255,0,0);
    ellipse(246,114,26,15);
    fill(0);
    ellipse(246,111,22,15);

    
	translate(245-malXscreen,135-malY);
}

function malLeftJump()
{

	translate(malXscreen-245,malY-535);

	//feet
	fill(200,0,0)
	triangle(251,525,243,540,257,534);
	triangle(237,528,242,535,225,537);

	//robe
	fill(0);
	rect(240,487,14,30);
	triangle(240,490,254,517,236,517);
	quad(254,517,235,517,230,532,266,536);

	//head
    fill(40,30,10);
    ellipse(243,476,20,25);

	//collar
	fill(0);
	triangle(240,512,258,477,246,476);

    //belt
    fill(255,0,0);
    ellipse(245,514,21,15);
    fill(0);
    ellipse(245,511,18,15);

    //arm
    stroke(0);
	strokeWeight(6);
    line(242,495,238,466);
    line(246,495,238,466);

    //reset parametres - post arm
    strokeWeight(1);
    noStroke();

	translate(245-malXscreen,535-malY);
}

function malRightJump()
{
	translate(malXscreen-45,malY-535);

	//feet
	fill(200,0,0);
	triangle(39,525,47,540,33,534);
	triangle(53,528,48,535,65,537);

	//robe
	fill(0);
	rect(36,487,14,30);
	triangle(50,490,36,517,54,517);
	quad(36,517,55,517,60,532,24,536);

	//head
    fill(40,30,10);
    ellipse(47,476,20,25);

	//collar
	fill(0);
	triangle(50,512,32,477,44,476);

    //belt
    fill(255,0,0);
    ellipse(45,514,21,15);
    fill(0);
    ellipse(45,511,18,15);

    //arm
    stroke(0);
	strokeWeight(6);
    line(48,495,52,466);
    line(44,495,52,466);

    //reset parametres - post arm
    strokeWeight(1);
    noStroke();

	translate(45-malXscreen,535-malY);
}

function drawEdie()
{
	// Basically the same as fairies
	stroke(255,255,0,50);
	strokeWeight(2);

	//aura
	fill(edie.auraCol);
	ellipse(edie.xPos,edie.yPos, edie.size + Math.random()*10,edie.size+10 + Math.random()*10);
	ellipse(edie.xPos,edie.yPos,edie.size+10 + Math.random()*10,edie.size + Math.random()*10);

	//center
	fill(edie.centCol);
	ellipse(edie.xPos,edie.yPos,Math.random()*10+edie.size/2,Math.random()*10+edie.size/2);

	noStroke();
}

function randCol()
{
	//select random colour
    var rgbVal = [(Math.random()*255),(Math.random()*255),(Math.random()*255)];
    return(rgbVal);
}

function lightningStrike()
{
	//lightning parametres
	strokeWeight(1);
	stroke(255,255,155);
	var xStartPos = random(0,width);
	var x2pos = (xStartPos + random(-50,50));
	var x3pos = (x2pos + random(-50,50));
	var x4pos = (x3pos + random(-50,50));
	var x5pos = (x4pos + random(-50,50));
	var x6pos = (x5pos + random(-50,50));
	var	y2pos = random(height/3, 0);
	var	y3pos = y2pos + random(height/3, 0);
	var	y4pos = y3pos + random(height/3, 0);
	var	y5pos = y4pos + random(height/3, 0);
	var	y6pos = y5pos + random(height/3, 0);

	//random strike
	if (Math.random() < 0.001)
	{
		background(40,40,140);
		line(xStartPos,0,x2pos,y2pos);
		line(x2pos,y2pos,x3pos,y3pos); 
		line(x3pos,y3pos,x4pos,y4pos);
		line(x4pos,y4pos,x5pos,y5pos);
		line(x5pos,y5pos,x6pos,y6pos);

		//offshoots
		if (Math.random() < 0.8)
		{
			varience = random(-50,50);
			line(x2pos,y2pos,x3pos+varience,y3pos+varience+100);
			line(x3pos+varience,y3pos+varience+100,x3pos+varience*2,y3pos+varience*2+200);
		}
	}
}

function cloudShape1 (xPos, yPos)
{
	ellipse(xPos,yPos,400,25);
	ellipse(xPos-280,yPos+60,400,25);
	ellipse(xPos+200,yPos+40,400,25);
}

function drawClouds()
{	
    fill(10,20,50)
    stroke(10,20,30)
	//drawing from array
	for (var i = 0; i < clouds.length; i++) 
	{
	    cloudShape1(clouds[i].xPos,clouds[i].yPos);
	}

	//deletion and recreation
	for (var i = 0; i < clouds.length; i++)
	{
		//moving right
		if (clouds[i].xPos+scrollPos/20 <= -width)
		{
			clouds[i] = { 
						xPos: (random(3*width,5*width)-scrollPos/20), 
						yPos: random(height/20,height/15),
						style: 1
						}
		}
		//moving left
		else if (clouds[i].xPos+scrollPos/20 >= 2*width)
		{
			clouds[i] = { 
						xPos: (random(-3*width,-width)-scrollPos/20), 
						yPos: random(height/20,height/15),
						style: 1 
						}
		}
	}
}

function mountainShape1(xPos, height, base)
{
			noStroke();
		    //peak
		    fill(180);
		    triangle(xPos,height,xPos-100,base,xPos+100,base);
		    //body
		    fill(160);
			triangle(xPos-40,height+30,xPos-100,base,xPos+100,base);
			triangle(xPos+30,height+20,xPos-100,base,xPos+100,base);
		    //hills
		    fill(140);
		    triangle(xPos-110,height+90,xPos-240,base,xPos-50,base);
		    triangle(xPos+90,height+100,xPos,base,xPos+220,base);
		    //cave
			noStroke();
			fill(5);
			ellipse(xPos-30,base,width/90,height/20);
}

function drawMountains()
{	
	//drawing from array
	for (var i = 0; i < mountains.length; i++) 
	{
	    mountainShape1(mountains[i].xPos,mountains[i].height,mountains[i].base);
	}

	//deletion and recreation
	for (var i = 0; i < mountains.length; i++)
	{
		//moving right
		if (mountains[i].xPos+scrollPos/6 <= -width)
		{
			mountains[i] = { 
						xPos: (random(1.5*width,2.5*width)-scrollPos/6), 
						height: height/2,
						base: height*3/4, 
						style: 1 
						}
		}
		//moving left
		else if (mountains[i].xPos+scrollPos/6 >= 2*width)
		{
			mountains[i] = { 
						xPos: (random(-1.5*width,-0.5*width)-scrollPos/6), 
						height: height/2,
						base: height*3/4,
						style: 1 
						}
		}
	}
}

function drawHouse()
{

	for ( var i = 0;  i < houseX.length; i++)
	{
		translate(houseX[i], 0);

		//chimney
			fill(88,34,0);
			line(0,255,0);
		//top quad
			quad(0-70,houseY-189,0-40,houseY-199,
				0-40,houseY-185,0-60,houseY-179);
		//bottom quad
		    quad(0-60,houseY-180,0-40,houseY-185,
		    	0-32,houseY-155,0-45,houseY-153);
		//chimney inner
			translate(0-55,houseY-194);
		    rotate(50);
		    translate(55-0,194-houseY);

		    stroke(44,17,0);
		    strokeWeight(1);
			fill(22,8,0);
			ellipse(0-55,houseY-194,30,5);
		//reset origin
			translate(0-55,houseY-194);
			rotate(-50);
			translate(55-0,194-houseY);
		//body
		    noStroke();
		    fill(58,34,10);
		    quad(0-90,houseY-150,0+120,houseY-170,0+100,houseY,0-70,houseY-20);
	    //window
		    fill(5,5,0);
		    quad(0-60,houseY-129,0+10,houseY-119,0+10,houseY-59,0-50,houseY-49);
	    //door
		    fill(98,54,10);
		    quad(0+40,houseY-99,0+110,houseY-89,0+90,houseY+10,0+40,houseY-6);
	    //shadow
		    fill(0);
		    triangle(0+40,houseY-100,0+100,houseY-91,0+100,houseY-101);

		translate(-houseX[i], 0);
	}

	//recreate houses - NEVER DELETE

		//delete left add right
		if (houseX[0]+(scrollPos) < -4000)
		{
			houseX[0] = int(houseX[houseX.length-1]+3000+Math.random()*500);
		}
		//delete right add left
		else if (houseX[houseX.length-1]+(scrollPos) > width+4000)
		{
			houseX[houseX.length-1] = int(houseX[0]-3000-Math.random()*500);
		}

	//keeps mountains in order, for above code to work smoothly
		houseX = sort(houseX);
}

function treeShape1(xPos,base)
{

	//draw a tree

	    translate(xPos-810,0);

	    stroke(29,17,5);

	//trunk - triangle
	    fill(29,17,5);
	    triangle(790,base+10,810,base-100,830,base+10);

		//trunk - lines
	    strokeWeight(9);
		line(800,base,780,440-101);
		line(805,base,785,430-101);
		line(810,base,795,410-101);
		line(815,base,815,420-101);
		line(820,base,825,450-101);

		//branches - bottom
		strokeWeight(8);
		line(780,440-101,700,420-101);
		line(785,430-101,720,380-101);
		line(795,410-101,850,370-101);
		line(815,420-101,860,410-101);
		line(825,450-101,880,420-101);

		//branches - top
		strokeWeight(7);
		line(720,280,680,220);
		line(850,270,830,210);
		line(860,310,920,270);
		line(880,320,910,340);

    //leaves
	    strokeWeight(2);
	    stroke(70,60,10);
		fill(60,50,0);

		//leaf 1
			beginShape();
			vertex(740,430-101);
			vertex(670,440-101);
			vertex(640,470-101);
			vertex(650,430-101);
			vertex(670,400-101);
			vertex(720,410-101);
			endShape(CLOSE);

		//leaf 2
			beginShape();
			vertex(660,300-101);
			vertex(650,340-101);
			vertex(680,380-101);
			vertex(760,410-101);
			vertex(770,370-101);
			vertex(740,340-101);
			endShape(CLOSE);

		//leaf 3
			beginShape();
			vertex(845,360-101);
			vertex(810,330-101);
			vertex(790,280-101);
			vertex(820,260-101);
			vertex(860,290-101);
			vertex(870,340-101);
			endShape(CLOSE);

		//leaf 4
			beginShape();
			vertex(860,410-101);
			vertex(890,360-101);
			vertex(960,350-101);
			vertex(950,370-101);
			vertex(930,390-101);
			vertex(920,400-101);
			endShape(CLOSE);

		//leaf 5
			beginShape();
			vertex(900,430-101);
			vertex(900,460-101);
			vertex(940,470-101);
			vertex(990,520-101);
			vertex(960,450-101);
			vertex(930,420-101);
			endShape(CLOSE);

	translate(810-xPos,0);
}

function drawTrees()
{	
	for (var i = 0; i < trees.length; i++) 
	{
	    treeShape1(trees[i].xPos,trees[i].base);
	}


	for (var i = 0; i < trees.length; i++)
	{
		if (trees[i].xPos+scrollPos <= -width)
		{
			trees[i] = { 
						xPos: (random(1.5*width,2.5*width)-scrollPos), 
						base: random(height*16/20, height*15/20), 
						style: 1 
						}
		}

		else if (trees[i].xPos+scrollPos >= 2*width)
		{
			trees[i] = { 
						xPos: (random(-1.5*width,-0.5*width)-scrollPos), 
						base: random(height*16/20, height*15/20), 
						style: 1 
						}
		}
	}
}

function fairyMake1(xPos,yPos,size,centCol,auraCol)
{
		//fairies
		stroke(255,255,0,50);
		strokeWeight(2);

		//make aura
		fill(auraCol);
		ellipse(xPos,yPos,size + random(0,10),size+10 + random(0,10));
		ellipse(xPos,yPos,size+10 + random(0,10),size + random(0,10));

		//make center
		fill(centCol);
		ellipse(xPos,yPos,random(0,10)+size/2,random(0,10)+size/2);
}

function drawFairies()
{
	for (var i = 0; i < fairies.length; i++)
		{
				fairyMake1(fairies[i].xPos,fairies[i].yPos,fairies[i].size,fairies[i].centCol,fairies[i].auraCol);
		}
}

function getFairy()
{
	//if fairy gets got
		for (var i = 0; i < fairies.length; i++)
		{
			if (fairies[i].xPos<=malXmap+24&&fairies[i].xPos>=malXmap-22
			&&fairies[i].yPos<=malY&&fairies[i].yPos>=malY-70&&
			!fairies[i].isFound)
			{
			fairies[i].isFound = true;
			fairiesGot += 1;

			// only activates on fairy collection
			console.log(fairiesGot);

			//pptwww animation
			strokeWeight(5);
			stroke(fairies[i].auraCol);
			line(malXscreen,malY-30,edie.xPos+20,edie.yPos);
			strokeWeight(3);
			stroke(fairies[i].centCol);
			line(malXscreen,malY-30,edie.xPos+20,edie.yPos);

			//change fairy position
			fairies[i].displayPos = fairiesGot-1;
			fairies[i].xPos = 800 + 20*(fairiesGot-1) - scrollPos;
			fairies[i].yPos = 130;

			//from Edie to score bar, same as above but after fairy moves.. also doesnt work

			strokeWeight(5);
			stroke(fairies[i].auraCol);
			line(malXscreen,malY-30,edie.xPos+20,edie.yPos);
			strokeWeight(3);
			stroke(fairies[i].centCol);
			line(malXscreen,malY-30,edie.xPos+20,edie.yPos);

			//edie adaption
				edie.size += 5;
			//(broke AF)
				edie.centCol[0] += 245/fairies.length;
				edie.centCol[1] += 245/fairies.length;
				edie.auraCol[0] -= 245/fairies.length;
				edie.auraCol[1] += 105/fairies.length;
			}

			if (fairies[i].isFound)
			{
				fairies[i].xPos = 800 + 20*fairies[i].displayPos - scrollPos;
			}
		}
}

function drawHoleInner()
{
	for (var i = 0; i < holes.length; i++) 
		{
		    fill(20,20,0);
			ellipse(holes[i].xPos+holes[i].width/2, floorY,holes[i].width,50);
		}
}

function drawHoleFront()
{
	for (var i = 0; i < holes.length; i++) 
	{
		//filler - foreground
		fill(30,88,0);
		beginShape();
		vertex(holes[i].xPos-30, height);
		vertex(holes[i].xPos, floorY);
		vertex(holes[i].xPos+5, floorY+10);
		vertex(holes[i].xPos+10, floorY+15);
		vertex(holes[i].xPos+25, floorY+20);
		vertex(holes[i].xPos+50, floorY+25);

		//backwards now
		vertex(holes[i].xPos+75, floorY+20);
		vertex(holes[i].xPos+90, floorY+15);
		vertex(holes[i].xPos+95, floorY+10);
		vertex(holes[i].xPos+100, floorY);
		vertex(holes[i].xPos+130, height);
		
		endShape();
	}
}

function fallInHole()
{

	for (var i = 0; i < holes.length; i++) 
	{
		if ( (malXmap>holes[i].xPos&&malXmap<holes[i].xPos+holes[i].width) && !isJumping && !isOnPlatform)
		{	//if malX over hole and not jumping
			isFalling = true;
		}
	}
}

function checkPlayerWon()
{
	if (fairiesGot == 10)
		{
			textSize(100);

			push();
			rotate(random(0.1,0.3));
			isWon = true;
			text('winner!', width/2,height/2);
			pop();
			fill(0);
			textSize(80);
			text('press space to continue', width/15, height-100);
			return;
		}
}

function checkPlayerDied()
{
	if (edie.yPos < 0)
	{
		malDeath();
	}
}

function malDeath()
{

		if (lives > 1)
		{
			lives -= 1;
			startGame();
		}
		else
		{
			isLost = true;
			fill(0);
			textSize(80);
			text('peak, better luck next time..', 80, height/2);
			text('(press space to restart)', 160, height/1.5);
			return;
		}
}

function nextLevel()
{
    // DO NOT CHANGE THIS FUNCTION!
    console.log('next level');
    textSize(700);
    text('next level', width/2, height/2)
}

function draw()
{
	//static
		//sky - Background
			background(0,0,40);
		    noStroke();
		    fill(0,155,0);

		//lightning
			var timer = 0;
			while (timer < 10)
			{
				lightningStrike();
				timer += 1;
			}

	//extreme background scroll
		push();
		translate(scrollPos/20,0);

		//clouds
			drawClouds();

		//end extreme scroll
			pop();

	//lesser background scroll
		push();
		translate(scrollPos/6,0);

		//mountains
			drawMountains();

		//end lesser scroll
			pop();

		//foreground - grass
			noStroke();
			fill(30,88,0);
		    rect(0, height*3/4, width, height/4);

	//start of foreground scroll
		push();
		translate(scrollPos,0);

		//hole - inside graphics only
			drawHoleInner();

		//trees
			drawTrees();

		//house - make into object, similar to other items, later
			drawHouse();

		//fairies
			drawFairies();

		//end of foreground movement
			pop();

		//collect collectable fairies
		getFairy();

		checkPlayerWon();
		checkPlayerDied();

	//our heroes Mal and Edie
		malControls();

		//isFalling. If not draw edie - SUPERIMPORTANT: Sends Edie skywards to trigger death
			if (isFalling)
			{
				edie.yPos -= 7;
				malY += 9.81;
				malSpeed = 2;
			}
			else
			{	//normal edie position
				edie.xPos = malXscreen - 40;
				edie.yPos = malY - 200;
			}

		//edie rotation
			translate(edie.xPos+20,edie.yPos+20);
			rotate(rorateNumber);
			translate(-edie.xPos+20,-edie.yPos+20);

			drawEdie();

			translate(edie.xPos-20,edie.yPos-20);
			rotate(-rorateNumber);
			translate(-edie.xPos-20,-edie.yPos-20);

			rorateNumber+=0.1;

	//hole - cover and collision
		push();
		translate(scrollPos,0);

		fallInHole();
		drawHoleFront();

	//enemies
		for (var i = 0; i < enemies.length; i++)
		{
			enemies[i].display();
			enemies[i].move();
			enemies[i].checkCollision();
		}

	//platforms
		isOnPlatform = false
		for (var i = 0; i < platforms.length; i++)
		{
			platforms[i].display()
			platforms[i].checkMalOn()
		}

		pop();

	//display
		textSize(40);
		fill(255);
		text('fairies: ' +  fairiesGot,width-200, 100);
		text('lives: ' + lives, 100, 100);
}