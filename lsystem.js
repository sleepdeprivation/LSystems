

/*
	Generates a string from the seed s using the production rules L
	by its step() function.
	It makes a new string, fills it using the production rules on the original,
	and replaces the original.
*/
function Lsystem(s, L){

	this.string = s;		//a string
	this.productionRules = L;	//maps characters to strings

	//produce the next string
	this.step = function(){
		var stringLength = this.string.length;
		var rule;
		var templist = ""; //a string to hold the production rules
		for(var ii = 0; ii < stringLength; ii++){
			rule = this.productionRules[this.string[ii]];
			templist += (rule === undefined) ? this.string[ii] : rule;
		}
		this.string = templist;
	}

	//dump the current screen to the console
	this.logAll = function(){
		console.log(this.string);
	}
}


function LSystemRenderer(s, canvas){

	this.system = s;

	this.divisor = 8;

	this.forwardStrings = ['F', 'E'];
	this.turnLeftStrings = ['-'];
	this.turnRightStrings = ['+'];

	this.RBGStrings = ['R', 'B', 'G']; //for changing colors
	this.lineColors = ['red', 'blue', 'green'];

	this.lineColor = "red";

	this.initialOrientation = 0;	//pointing up
	this.theta = Math.PI/this.divisor;
	this.increment = 4;

	var x = canvas.width/2;		//starting location, (x,y)
	var y = canvas.height/2;

	this.ctx = canvas.getContext('2d');
	this.ctx.moveTo(x, y);

	this.draw = function(){
		var system = this.system;

		var deltaI = this.initialOrientation;
		var delta = this.theta;

		var ctx = this.ctx;

		var divisor2 = this.divisor*2;

		ctx.beginPath();
		ctx.strokeStyle= this.lineColor;

		var deltaX,deltaY,newX,newY, color;
		for(var ii = 0; ii < system.string.length; ii++){
			if(this.forwardStrings.indexOf( system.string[ii] ) != -1){
				//console.log((deltaI*delta));
				deltaX = this.increment*Math.cos((deltaI)*(delta));
				deltaY = this.increment*Math.sin((deltaI)*(delta));
				x += deltaX;
				y += deltaY;
				//console.log(x, y);
				ctx.lineTo(x, y);
			}else if(this.turnRightStrings.indexOf(system.string[ii]) != -1){
				deltaI = (deltaI+1)%(divisor2);
			}else if(this.turnLeftStrings.indexOf(system.string[ii]) != -1){
				deltaI = (deltaI-1)%(divisor2);
			}else if(this.RBGStrings.indexOf(system.string[ii]) != -1){
				color = this.RBGStrings.indexOf(system.string[ii]);
				ctx.closePath();
				ctx.stroke();
				ctx.strokeStyle = this.lineColors[color];
				ctx.beginPath();
			}
		}

		ctx.stroke();
	}


}














