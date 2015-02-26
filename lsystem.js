/*
//really, unecessary
//wrote this because I though it would be a good idea to generate a new string
//without allocating a new one and throwing away the old
//Such a solution seems convoluted and unecessary tho
//string as a linked list... hmm

function listNode(data, next){
	this.data = data || null;
	this.next = next || null;
}

//construct linked list from an ordinary one
function list(data){
	this.length = data.length;
	this.head = new listNode();
	this.data = data;
	var node = this.head;
	for(var ii = 0; ii < data.length - 1 ; ii++){
		node.data = data[ii];
		node.next = new listNode();
		node = node.next;
	}
	node.data = data[data.length-1];
	this.tail = node;
}
*/


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

















