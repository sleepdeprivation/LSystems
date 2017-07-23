import { expect, assert } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import 'mocha';

import {LSystem, LSystemRenderer} from "../LSystem";


describe("LSystem Test", () => {
    it("Steps correctly", () => {
      var seed = 'DFDF';
      var rules = {
        'D' : 'helloF',
        'F' : 'worldD',
      }
      var ls = new LSystem(seed, rules);
      ls.step();
      //console.log("Instructions: ", ls.instructions);
      assert.equal(ls.instructions, 'helloFworldDhelloFworldD');
      ls.step();
      assert.equal(ls.instructions, 'helloworldDworldhelloFhelloworldDworldhelloF');
    });

    it("performs under stress", () => {
      var seed = 'F+D+FD+-';
      var rules = {
        'D' : '<hello>F',
        'F' : 'F<world>FD',
        '+' : '-D!',
        '-' : 'FD?',
      }
      var ls = new LSystem(seed, rules);
      for(var ii = 0; ii < 10; ii++){
        ls.step();
      }
      console.log("length: ", ls.instructions.length);
    });
});


describe("LSystemRenderer Test", () => {
  it("lets us set props that already exist", () => {
    var config = {
      fakeProp : "dfaskljdfaskljdfsa",
      lineColor : "very unique string"
    }
    var lrender = new LSystemRenderer(config);
    assert.equal(lrender.lineColor, config.lineColor);
    //the following won't even run because typescript:
    //assert.equal(lrender.fakeProp, undefined);

  })

})
