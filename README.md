# LSystems

A little library for creating L-Systems, recently converted to typescript and webpack.

To compile, just `npm install` followed by `npm run build`. This should create `lsystems.js` which exports 3 classes under the package `lsystems`:

* LSystem
* LSystemRenderer
* LSystemGenerator

There are also a couple basic tests for `LSystem` in `src/tests`

You should be able to see output in `index.html`, and an example of how the library may be used.

*Note: you **WILL** need typescript globally installed*

#### What is an LSystem?

Check out this pdf:
http://algorithmicbotany.org/papers/abop/abop-ch1.pdf

#### What's inside?

Lsystem class provides:

```javascript
  Lsystem(seed, rules);   //constructor
  step();                 //iterate once
  stepn(4);               //iterate 4 times
```

Renderer class:

```javascript
  Renderer(config);         //constructor
  draw();                   //draw to the canvas
```

Generator class:

```javascript

  singleRuleRandom(x);    //return a rule of length x

  ruleSetRandom();        //return a random ruleset

  randomSystem();         //return a random LSystem

  dragonCurve();          //return an LSystem that will render to the famous "dragon curve"
```

Properties on the renderer that can be passed in the config block (along with their default values):

(you must include a `system` and a `canvas`)

```javascript
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

```

#### A minimal example

You can find this in index.html

```javascript
      	var canvas1 = document.getElementById("canvas");

      	var data, system, renderer, canvas1, ii, kk;
        console.log(lsystems);

        system = (new lsystems.LSystemGenerator).dragonCurve();
        system.stepn(8);
        renderCfg = {
          system : system,
          canvas : canvas
        }
        renderer = new lsystems.LSystemRenderer(renderCfg);
        renderer.draw();
```
