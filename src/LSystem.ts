export class LSystem {

  productionRules : any;
  instructions : string;

  constructor(S: string, L: any){
    this.instructions = S;
    this.productionRules = L;
  }

  //produce the next string
	step(){
		var stringLength = this.instructions.length;
		var rule : any;
		var templist = ""; //a string to hold the production rules
		for(var ii = 0; ii < stringLength; ii++){
			templist += this.productionRules[this.instructions[ii]] || this.instructions[ii];
		}
		this.instructions = templist;
	}

  stepn(n){
    for(var ii = 0; ii < n; ii++){
      this.step();
    }
  }

}

export class LSystemRenderer{

    system : LSystem;

    divisor = 2;

    forwardStrings = ['F', 'E'];
    turnLeftStrings = ['-'];
    turnRightStrings = ['+'];

    RBGStrings = ['R', 'B', 'G']; //for changing colors
    lineColors = ['red', 'blue', 'green'];

    lineColor = "red";

    initialOrientation = 0;	//pointing up
    theta = Math.PI/this.divisor;
    increment = 12;

    startX = 0;
    startY = 0;

    ctx : any;

    canvas : any;

    constructor(config : any){

      var canvas = config.canvas;

      this.canvas = canvas;

      this.startX = canvas.width/2;		//starting location, (x,y)
      this.startY = canvas.height/2;

      this.ctx = canvas.getContext('2d');
      this.ctx.moveTo(this.startX, this.startY);

      this.system = config.system;

      for (var prop in config) {
        if(this.hasOwnProperty(prop)){
          this[prop] = config[prop];
        };
      }
    }


    clear(){
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(-1, -1, this.canvas.width + 1, this.canvas.height + 1);
      this.ctx.stroke();
    }

  	draw(){

  		var system = this.system;

  		var deltaI = this.initialOrientation;
  		var delta = this.theta;

  		var ctx = this.ctx;

  		var divisor2 = this.divisor*2;

  		ctx.beginPath();
  		ctx.strokeStyle= this.lineColor;

  		var deltaX,deltaY,newX,newY, color;
  		for(var ii = 0; ii < system.instructions.length; ii++){
  			if(this.forwardStrings.indexOf( system.instructions[ii] ) != -1){
  				//console.log((deltaI*delta));
  				deltaX = this.increment*Math.cos((deltaI)*(delta));
  				deltaY = this.increment*Math.sin((deltaI)*(delta));
  				this.startX += deltaX;
  				this.startY += deltaY;
  				//console.log(x, y);
  				ctx.lineTo(this.startX, this.startY);
  			}else if(this.turnRightStrings.indexOf(system.instructions[ii]) != -1){
  				deltaI = (deltaI+1)%(divisor2);
  			}else if(this.turnLeftStrings.indexOf(system.instructions[ii]) != -1){
  				deltaI = (deltaI-1)%(divisor2);
  			}else if(this.RBGStrings.indexOf(system.instructions[ii]) != -1){
  				color = this.RBGStrings.indexOf(system.instructions[ii]);
  				ctx.closePath();
  				ctx.stroke();
  				ctx.strokeStyle = this.lineColors[color];
  				ctx.beginPath();
  			}
  		}

      console.log("completed render");
  		ctx.stroke();
  	}
}

function randomNumber(x){
  return Math.floor((Math.random() * x));// + 1);
}

export class LSystemGenerator{

  possible = ['F', '+', '-', 'E', 'B', 'G', 'R'];

  singleRuleRandom(x){
  	var retval = "";
  	for(var ii = 0; ii < x; ii++){
  		retval += String(this.possible[randomNumber(this.possible.length)]);
  	}
  	return retval;
  }

  ruleSetRandom(){
  	var rule = 	{
  				'F': this.singleRuleRandom(13),
  				'E': this.singleRuleRandom(13)
  			};
  	return rule;
  }

  randomSystem(){
    var rules = this.ruleSetRandom();
    var seed  = "F";
    return new LSystem(seed, rules);
  }

  dragonCurve(){
    var rule = {		//dragon curve
      'F': 'F+E+',
      'E': '-F-E'
      }
    var seed = "F";
    return new LSystem(seed, rule);
  }

}
