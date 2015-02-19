/*
//really, unecessary
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



function Lsystem(s, L){

	this.string = s;		//a string
	this.productionRules = L;	//maps characters to strings


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

	this.logAll = function(){
		console.log(this.string);
	}
}

















