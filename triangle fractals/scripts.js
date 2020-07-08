function drawLine(p0, p1, start_color, end_color){
	let gradient = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
	gradient.addColorStop(0, start_color);
	gradient.addColorStop(1, end_color);

	ctx.beginPath();
	ctx.moveTo(p0.x, p0.y);
	ctx.lineTo(p1.x, p1.y);
	ctx.strokeStyle = gradient;
	ctx.lineWidth = 1;
	ctx.stroke();
}

function drawTriangle(p0, p1, p2) {
	const colors = ['red', 'green', 'blue']
	drawLine(p0, p1, colors[0], colors[1]);
	drawLine(p1, p2, colors[1], colors[2]);
	drawLine(p2, p0, colors[2], colors[0]);
}

function drawFract(p0, p1, p2, limit){
	if(limit > 0){
		const pA = {
				x: p0.x + (p1.x - p0.x)/2,
				y: p0.y - (p0.y - p1.y)/2
			},
			pB = {
				x: p1.x + (p2.x - p1.x)/2,
				y: p1.y - (p1.y - p2.y)/2
			},
			pC = {
				x: p0.x + (p2.x - p0.x)/2,
				y: p0.y
			};
		drawFract(p0, pA, pC, limit-1);
		drawFract(pA, p1, pB, limit-1);
		drawFract(pC, pB, p2, limit-1);
	}
	else{
		drawTriangle(p0,p1,p2);
	}
}

var size = 300;
var myCanvas = document.createElement("canvas");
myCanvas.width=size;
myCanvas.height=size;
document.body.appendChild(myCanvas);
var ctx = myCanvas.getContext("2d");

drawFract({x: 0, y:size}, {x:size/2, y:0},  {x:size, y:size}, 5);