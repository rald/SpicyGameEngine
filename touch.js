var touches=null;

function touchEnd(event) {
	event.preventDefault();
	touches=event.targetTouches;
}

function touchMove(event) {
	event.preventDefault();
	touches=event.targetTouches;
}

function touchStart(event) {
	event.preventDefault();
	touches=event.targetTouches;
}

canvas.addEventListener("touchend", touchEnd, {passive:false});
canvas.addEventListener("touchmove", touchMove, {passive:false});
canvas.addEventListener("touchstart", touchStart, {passive:false});
