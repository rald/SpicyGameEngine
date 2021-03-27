var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var SCREEN_WIDTH=240;
var SCREEN_HEIGHT=320;

var FPS=60;
var DELAY_MAX;

var size=16;
var width=12,height=12;
var x=0,y=0;

var screenOffsetX=(canvas.width-SCREEN_WIDTH)/2;
var screenOffsetY=0

var gridOffsetX=(SCREEN_WIDTH-width*size)/2+screenOffsetX;
var gridOffsetY=screenOffsetY+size;

var dx,dy;
var delay;

var hold;

var pause;

var fx,fy;

var sx=new Array(width*height);
var sy=new Array(width*height);

var btnA=new Button("32px monospace","L/D",32,canvas.height-80,64,64);

var btnB=new Button("32px monospace","U/R",canvas.width-96,canvas.height-80,64,64);



function rnd(x) {
	return Math.floor(Math.random()*x);
}



function food() {
	var slots=[];
	for(var k=0;k<height;k++) {
		for(var j=0;j<width;j++) {	
			var empty=true;
			for(var i=0;i<sn;i++) {
				if(sx[i]==j && sy[i]==k) {
					empty=false;
					break;
				}	
			}
			if(empty) {
				slots.push({"x":j,"y":k});
			}
		}
	}

	var slot=slots[rnd(slots.length)];
	fx=slot.x;
	fy=slot.y;
}



function drawBox(x,y) {
	setFillStyle("#00FF00");
	fillRect(x*size+gridOffsetX+4,y*size+gridOffsetY+4,size-8,size-8);
}



function drawGrid(x,y,width,height,size) {
	for(var j=0;j<height;j++) {
		for(var i=0;i<width;i++) {
			setStrokeStyle("#00FF00");
			drawRect(x+i*size,y+j*size,size,size);
		}
	}
}


function init() {
	DELAY_MAX=60;
	dx=1,dy=0;
	delay=0;
	hold=false;
	pause=false;
	sn=0;
	gameover=false;
	score=0;
	frames=0;
	change=false;

	sn=4;
	for(var i=0;i<sn;i++) {
		sx[i]=3-i;
		sy[i]=0;
	}
	x=sx[0];
	y=sy[0];

	food();
}



function draw() {

	screenOffsetX=(canvas.width-SCREEN_WIDTH)/2;
	screenOffsetY=0

	gridOffsetX=(SCREEN_WIDTH-width*size)/2+screenOffsetX;
	gridOffsetY=screenOffsetY+size;

	setFillStyle("#808080");
	fillRect(0,0,canvas.width,canvas.height);

	setFillStyle("#000000");
	fillRect(screenOffsetX,screenOffsetY,SCREEN_WIDTH,SCREEN_HEIGHT);

	if(pause) {

		if(orientation==0 || orientation==180) pause=false;

		setFont("16px monospace");
		setFillStyle("#00FF00");
		setTextAlign("center");
		fillText("Please rotate device...",SCREEN_WIDTH/2+screenOffsetX,32);
		
	} else {

		if(orientation==90 || orientation==-90) pause=true;

		drawGrid(gridOffsetX,gridOffsetY,width,height,size);

		drawBox(fx,fy);

		for(var i=0;i<sn;i++) {
			drawBox(sx[i],sy[i]);
		}

		setFont("16px monospace");
		setFillStyle("#00FF00");
		setTextAlign("center");
		fillText(score,SCREEN_WIDTH/2+screenOffsetX,SCREEN_HEIGHT-96+screenOffsetY);			

    drawText("Hello World",8,8,4,font,["transparent","#00ff00"]);

		if(gameover) {
			setFont("16px monospace");
			setFillStyle("#00FF00");
			setTextAlign("center");
			fillText("Game Over",SCREEN_WIDTH/2+screenOffsetX,SCREEN_HEIGHT-80+screenOffsetY);			
		}

		btnA.draw(ctx);
		btnB.draw(ctx);

		btnA.handleEvents(touches);
		btnB.handleEvents(touches);

  
		if(!change) {
			if(!hold) {
				if(!gameover) {

					if(btnA.state==Button.DOWN) {
						if(dx==0 && (dy==-1 || dy==1)) { dy=0; dx=-1; change=true; }
						else if((dx==-1 || dx==1) && dy==0) { dy=1; dx=0; change=true; }
						hold=true;
					}

					if(btnB.state==Button.DOWN) {
						if(dx==0 && (dy==-1 || dy==1)) { dy=0; dx=1; change=true; }
						else if((dx==-1 || dx==1) && dy==0) { dy=-1; dx=0; change=true; }
						hold=true;
					}
				} else {
					if(btnA.state==Button.DOWN && btnB.state==Button.DOWN) {
						init();
					}
				}
			} else if(btnA.state==Button.UP && btnB.state==Button.UP) {
				hold=false;
			}
		}
		
		if(!gameover) {
			
			delay++;
			if(delay>=DELAY_MAX) {
				delay=0;

				change=false;

				x+=dx;
				y+=dy;

				if(x<0) x=width-1;
				if(x>=width) x=0;
				if(y<0) y=height-1;
				if(y>=height) y=0;

				for(var i=0;i<sn;i++) {
					if(x==sx[i] && y==sy[i]) {
						change=false;
						hold=false;
						gameover=true;
					}
				}

				if(x==fx && y==fy) {
					if(sn<width*height) {
						sn++;
					}
					food();	
					score++;		
				}

				for(var i=sn-1;i>0;i--) {
					sx[i]=sx[i-1];
					sy[i]=sy[i-1];
				}
				sx[0]=x;
				sy[0]=y;

			}

			frames++;

			if(frames>=180) {
				frames=0;
				if(DELAY_MAX-1>=15) DELAY_MAX-=1; else DELAY_MAX=15;
			}
			
		}
	}
}



init();



setInterval(draw,1000/FPS);


