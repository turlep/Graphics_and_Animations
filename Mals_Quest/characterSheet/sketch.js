/*

The Game Project

Week 2 - part a

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the different states of your game character.

Write the code so that your character appears inside the box for each
state.

Each state is worth two marks:

//standing front facing = 2
//jumping facing forwards = 2
//walking left = 2
//walking right = 2
//jumping left and jumping right = 2

0 marks = not a reasonable attempt
1 mark = attempted but it's messy or lacks detail
2 marks = you've used lots of shape functions to create a detailed
game character

** Only submit your sketch.js **

*/

function setup()
{
    createCanvas(400, 600);
}

function draw()
{
    background(255);

//Standing, facing frontwards
    stroke(100);
    noFill();
    rect(20, 60, 50, 80);
    noStroke();
    fill(0);
    text("1. standing front facing", 20, 160);

    //draw person

	//feet
	fill(200,0,0)
	triangle(40,125,30,135,44,135)
	triangle(51,125,47,135,61,135)

    //robe
    fill(0);
    rect(34,87,23,30);
    triangle(44,112,32,77,57,76);
    quad(34,117,57,117,64,132,24,134)

    //head
    fill(100,50,0);
    ellipse(44,77,20,25);
	triangle(43,97,40,85,48,85);

    //belt
    fill(255,0,0)
    ellipse(46,114,26,15);
    fill(0);
    ellipse(46,111,22,15)


//Jumping facing forwards
    stroke(100);
    noFill();
    rect(220, 60, 50, 80);
    noStroke();
    fill(0);
    text("2. jumping facing forwards", 220, 160);

	//feet
	fill(200,0,0)
	triangle(240,125,230,139,244,135)
	triangle(251,125,247,135,261,139)

    //robe
    fill(0);
    rect(235,87,20,30);
    triangle(244,112,232,77,257,76);
    quad(234,117,257,117,264,132,224,134)

    //head
    fill(100,50,0);
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
    fill(255,0,0)
    ellipse(246,114,26,15);
    fill(0);
    ellipse(246,111,22,15)


//Walking, turned left
//order of shapes (right-left) is reversed

    stroke(100);
    noFill();
    rect(20, 260, 50, 80);
    noStroke();
    fill(0);
    text("3. Walking left", 20, 360);

    //Add your code here ...

	//feet
	fill(200,0,0)
	triangle(37,328,42,337,25,336)
	triangle(53,325,43,339,57,335)

	//robe
	fill(0);
	rect(40,287,14,30);
	triangle(40,290,54,317,36,317)
	quad(54,317,35,317,30,332,66,336);

	//head
    fill(100,50,0);
    ellipse(42,278,20,25);

	//collar
	fill(0)
	triangle(40,312,58,277,46,276);

    //belt
    fill(255,0,0)
    ellipse(45,314,21,15);
    fill(0);
    ellipse(45,311,18,15)


//Walking, turned right
    stroke(100);
    noFill();
    rect(220,260, 50, 80);
    noStroke();
    fill(0);
    text("4. Walking right", 220, 360);

    //Add your code here ...

	//feet
	fill(200,0,0)
	triangle(237,325,247,339,233,335)
	triangle(253,328,248,337,265,336)

	//robe
	fill(0);
	rect(236,287,14,30);
	triangle(250,290,236,317,254,317)
	quad(236,317,255,317,260,332,224,336);

	//head
    fill(100,50,0);
    ellipse(248,278,20,25);

	//collar
	fill(0)
	triangle(250,312,232,277,244,276);

    //belt
    fill(255,0,0)
    ellipse(245,314,21,15);
    fill(0);
    ellipse(245,311,18,15)


//Jumping right
    stroke(100);
    noFill();
    rect(20, 460, 50, 80);
    noStroke();
    fill(0);
    text("5. Jumping to the right", 20, 560);

    //Add your code here ...

   //feet
	fill(200,0,0)
	triangle(39,525,47,540,33,534)
	triangle(53,528,48,535,65,537)

	//robe
	fill(0);
	rect(36,487,14,30);
	triangle(50,490,36,517,54,517)
	quad(36,517,55,517,60,532,24,536);

	//head
    fill(100,50,0);
    ellipse(47,476,20,25);

	//collar
	fill(0)
	triangle(50,512,32,477,44,476);

    //belt
    fill(255,0,0)
    ellipse(45,514,21,15);
    fill(0);
    ellipse(45,511,18,15)

    //arm
    stroke(0);
	strokeWeight(6);
    line(48,495,52,466);
    line(44,495,52,466);

    //reset parametres - post arm
    strokeWeight(1);
    noStroke();


//Jumping to the left
//order of shapes (right-left) is reversed
    stroke(100);
    noFill();
    rect(220, 460, 50, 80);
    noStroke();
    fill(0);
    text("6. Jumping to the left", 220, 560);

    //Add your code here ...

	//feet
	fill(200,0,0)
	triangle(251,525,243,540,257,534)
	triangle(237,528,242,535,225,537)

	//robe
	fill(0);
	rect(240,487,14,30);
	triangle(240,490,254,517,236,517)
	quad(254,517,235,517,230,532,266,536);

	//head
    fill(100,50,0);
    ellipse(243,476,20,25);

	//collar
	fill(0)
	triangle(240,512,258,477,246,476);

    //belt
    fill(255,0,0)
    ellipse(245,514,21,15);
    fill(0);
    ellipse(245,511,18,15)

    //arm
    stroke(0);
	strokeWeight(6);
    line(242,495,238,466);
    line(246,495,238,466);

    //reset parametres - post arm
    strokeWeight(1);
    noStroke();

}