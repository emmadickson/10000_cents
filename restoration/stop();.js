stop();

var overX = -200;
var overY = -200;
var overNum = 0;
var selNum = 0;
//var delayTimer = 0;
var yOff = dolla._y;
var xOff = dolla._x;
//var scene = "main";
var playSpeed = 5;
//create the listener object
var mouseHandle:Object = new Object();
//create the event
_root.onEnterFrame = function() {
	//if (scene == "main") {
	for (s=0; s<playSpeed; s++) {
		draw();
	}
};

mouseHandle.onMouseMove = function(){
	if (distance(selected_mc._x, selected_mc._y, _xmouse, _ymouse)>10) {
		selected_mc._x = -1000;
		selected_mc._y = -1000;
		
		selected_mc._visible = false;
		popup._visible = false;
		downArrow._visible = false;
		upArrow._visible = false;
	}
	if (mouseInDollar()) {
		Mouse.hide();
		if (_xmouse>437) {
			if (_ymouse>yOff+160) {
				image_mc.gotoAndStop(4);
			} else {
				image_mc.gotoAndStop(2);
			}
		} else {
			if (_ymouse>yOff+160) {
				image_mc.gotoAndStop(3);
			} else {
				image_mc.gotoAndStop(1);
			}
		}
		overX = Math.floor((_xmouse)/8)*8;
		overY = Math.floor((_ymouse-yOff)/3.4)*3.4;
		image_mc._x = overX;
		image_mc._y = overY+yOff;
		//mc_rollOver._x = overX;
		//  mc_rollOver._y = overY;
		if (overNum != ((overX/7)*80)+((overY)/4)+1) {
			overNum = ((overX/7)*80)+((overY)/4)+1;
			//delayTimer = 0;
			if (overNum>0) {
				lookAt.text = overNum;
				//image_mc.imageHolder.loadMovie("medium/Sheep_"+overNum+".jpg");
			}
		}
	} else {
		Mouse.show();
		image_mc._x = -200;
		image_mc._y = -200;
		mc_rollOver._x = -200;
		mc_rollOver._y = -200;
		//overNum = -100;
		//if ((selNum>0) && (lookAt.text != selNum)) {
	//		lookAt.text = selNum;
			//image_mc.imageHolder.loadMovie("medium/Sheep_"+selNum+".jpg");
	//	}
	}
}


mouseHandle.onMouseDown = function() {
   
	if (mouseInDollar()) {
		selNum = ((overX/7)*80)+((overY)/4)+1;
		selected_mc._x = overX;
		selected_mc._y = overY+yOff;
		
		//selectedSheep_mc.imageHolder.loadMovie("medium/Sheep_"+selNum+".jpg");
		//loading_mc._alpha = 100;
		drawClip = popup.drawing.createEmptyMovieClip("drawClip", 10);
		drawClip.setMask(popup.drawMask_mc);
		drawClip._xscale = 50;
		drawClip._yscale = 50;
		theX = (overX/8)-4;
		theY = (overY/3.4+1);
		popup.imageHolder.loadMovie("http://www.tenthousandcents.com/imagebits/"+theX+"."+theY+".jpg");
		selected_mc._visible = true;
		//drawing._x = selected_mc._x;
		//drawing._y = selected_mc._y;
		popUp(selected_mc._x,selected_mc._y);
		//drawMask_mc._x = drawing._x;
		//drawMask_mc._y = drawing._y;
		//trace((overX/8)-4 + " " + (overY/3.4+1));
		//trace(theX + " " + theY);
		sheepLoad.load("http://www.tenthousandcents.com/getDrawing.php?x="+theX+"&y="+theY);
	}
};

import flash.filters.DropShadowFilter;

//create the filter
var myFilter:DropShadowFilter = new DropShadowFilter(0, 45, 0x555555, .6, 10, 10, 2, 3);
//apply the filter
image_mc.filters = new Array(myFilter);
//dolla.filters = new Array(myFilter);
popup.filters = new Array(myFilter);
//add the listener to the Mouse object
Mouse.addListener(mouseHandle);

function popUp(nX, nY) {
	popup._visible = true;
	if (nY>dolla._y+dolla._height/2) {
		popup._x = nX+5;
		popup._y = nY-popup._height/2-8;
		downArrow._x = nX+5;
		downArrow._y = nY-1;
		downArrow._visible = true;
		upArrow._visible = false;
	} else {
		popup._x = nX+5;
		popup._y = nY+popup._height/2+6+7;
		upArrow._x = nX+5;
		upArrow._y = nY+6;
		downArrow._visible = false;
		upArrow._visible = true;
	}
	if (nX<dolla._x+180) {
		popup._x = dolla._x+180;
	}
	if (nX>dolla._x+dolla._width-180) {
		popup._x = dolla._x+dolla._width-180;
	}
}

function inDollar(x1, y1) {
	if ((y1<dolla._y+dolla._height && y1>dolla._y) && ((x1<dolla._x+dolla._width-5) && (x1>dolla._x))) {
		return true;
	} else {
		return false;
	}
}

function mouseInDollar() {
	if (inDollar(_xmouse, _ymouse)) {
		return true;
	} else {
		return false;
	}
}



function distance(x1, y1, x2, y2) {
	var dx = x2-x1;
	var dy = y2-y1;
	return Math.sqrt(dx*dx+dy*dy);
}