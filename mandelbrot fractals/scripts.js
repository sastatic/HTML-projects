function checkIfBelongsToMandelbrotSet(x, y) {
	var realComponentOfResult = x;
	var imaginaryComponentOfResult = y;
	var maxIterations = 100;

	for(var i = 0; i < maxIterations; i++) {
		var tempRealComponent = realComponentOfResult * realComponentOfResult - imaginaryComponentOfResult * imaginaryComponentOfResult + x;

		var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult + y;

		realComponentOfResult = tempRealComponent;
		imaginaryComponentOfResult = tempImaginaryComponent;
	
		if (realComponentOfResult * imaginaryComponentOfResult > 5)
			return (i/maxIterations * 100); // In the Mandelbrot set
	}

	return 0;
}

function color_canvas(panX, panY, magnificationFactor) {
	for(var x=0; x < myCanvas.width; x++) {
		for(var y=0; y < myCanvas.height; y++) {
			var belongsToSet = checkIfBelongsToMandelbrotSet(x/magnificationFactor - panX, y/magnificationFactor - panY);
			if(belongsToSet == 0) {
				ctx.fillStyle = '#000';
				ctx.fillRect(x,y, 1,1); 
			} else {
				ctx.fillStyle = 'hsl(0, 100%, ' + belongsToSet + '%)';
				ctx.fillRect(x,y, 1,1);
			}
		}
	}
}

var myCanvas = document.createElement("canvas");
myCanvas.width=600;
myCanvas.height=600;
document.body.appendChild(myCanvas);
var ctx = myCanvas.getContext("2d");

color_canvas(2, 1.5, 200);
// color_canvas(0.7, 0.6, 2900)