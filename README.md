# LSystems
Experiments with L-systems

####About

-A class for making a string from a set of rules and a seed in that "L-System" way.

-A renderer that renders to the canvas.

You can see it in action at http://cburke.scary4cat.com/javascript/LSystems/

####What is an LSystem?

Kind of like a fractal...

I read a good bit of this pdf:
http://algorithmicbotany.org/papers/abop/abop-ch1.pdf

####OK. What can it do?

Lsystem class provides:

```javascript
  Lsystem(seed, rules); //constructor
  step();                 //iterate once
```

Renderer class provides:

```javascript
  Renderer(system, canvas); //constructor
  draw();                   //draw to the canvas
```

Properties on the renderer that can be changed (along with their default values:

```javascript
	this.forwardStrings = ['F', 'E'];   //which characters mean "move forward"
	this.turnLeftStrings = ['-'];       //which characters mean "turn right"
	this.turnRightStrings = ['+'];      //which characters mean "turn left"

	this.lineColor = "red";             //what color is the line we'll be drawing with

	this.initialOrientation = 0;        //initial orientation (measured in radians)
	this.theta = Math.PI/2;             //measured in radians
	this.increment = 4;                 //distance (in px) that we move forward

```

####A minimal example

```javascript

var system, renderer, seed, rule, canvas1;

//grab hold of a canvas
canvas1 = document.getElementById('view1');

//we need a seed
seed = "F";

//and a rule set
rule = {		//dragon curve
		'F': 'F+E+',
		'E': '-F-E'
	}

//make a new system
system = new Lsystem(data, rule);


//iterate a little bit
for(var kk = 0; kk < 8; kk++){
	system.step();
}

//render it
renderer = new LSystemRenderer(system, canvas1);
renderer.draw();

```
