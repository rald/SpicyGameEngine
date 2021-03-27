function Button(font,text,x,y,w,h) {
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.font=font;
	this.text=text;
	this.state=Button.UP;

	this.draw=function() {

		switch(this.state) {
			case Button.UP:

				setFillStyle("#00000080");
				setStrokeStyle("#FFFFFF80");
				fillRect(this.x,this.y,this.w,this.h);
				drawRect(this.x,this.y,this.w,this.h);

				setFillStyle("#FFFFFF80");
				setTextAlign("center");
				setTextBaseline("middle");
				setFont(this.font);
				fillText(this.text,this.x+this.w/2,this.y+this.h/2);

				break;

			case Button.DOWN:

				setFillStyle("#FFFFFF80");
				setStrokeStyle("#00000080");
				fillRect(this.x,this.y,this.w,this.h);
				drawRect(this.x,this.y,this.w,this.h);

				setFillStyle("#00000080");
				setTextAlign("center");
				setTextBaseline("middle");
				setFont(this.font);
				fillText(this.text,this.x+this.w/2,this.y+this.h/2);

				break;
		}
	}

	this.handleEvents=function(touches) {
		this.state=Button.UP;
		if(touches!=null) {
			for(var i=touches.length-1;i>=0;i--) {
			  var touch=touches[i];
			  if(inrect(touch.clientX,touch.clientY,this.x,this.y,this.w,this.h)) {
					this.state=Button.DOWN;
					return true;
			  }
			}
		}
		return false;
	}

}

Button.UP=0;
Button.DOWN=1;
