

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

	this.forwardStrings = ['F', 'E'];
	this.turnLeftStrings = ['-'];
	this.turnRightStrings = ['+'];

	this.lineColor = "red";

	this.initialOrientation = 0;	//pointing up
	this.theta = Math.PI/2;		//quarter turn
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

		ctx.beginPath();
		ctx.fillStyle= this.lineColor;

		var deltaX,deltaY,newX,newY;
		for(var ii = 0; ii < system.string.length; ii++){
			if(this.forwardStrings.indexOf( system.string[ii] ) != -1){
				//console.log("moving on");
				deltaX = this.increment*Math.cos((deltaI)*(delta));
				deltaY = this.increment*Math.sin((deltaI)*(delta));
				x += deltaX;
				y += deltaY;
				//console.log(x, y);
				ctx.lineTo(x, y);
			}else if(this.turnRightStrings.indexOf(system.string[ii]) != -1){
				deltaI = (deltaI+1)%4;
			}else if(this.turnLeftStrings.indexOf(system.string[ii]) != -1){
				deltaI = (deltaI-1)%4;
			}
		}

		ctx.stroke();
	}


}














