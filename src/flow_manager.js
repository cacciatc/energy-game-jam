function FlowManager() {

};


FlowManager.prototype.update = function(source, sink, playfield) {
	if(source == sink) {
		return;
	}
	var neighbors = this.neighbors(source, playfield);
	
	this.rupdate(neighbors.north);
	this.rupdate(neighbors.south);
	this.rupdate(neighbors.east);
	this.rupdate(neighbors.west);

	// for any if there is a cable determine if the entrance or exit is the direction im approaching from
	// if so, turn it on
	// if not, turn it out
	// if sink, game won!!!
};

FlowManager.prototype.rupdate = function(current, neighbor, sink, playfield) {

};

FlowManager.prototype.neighbors = function(square, playfield) {
	for(var row = 0; row < playfield.length; row++) {
		for(var col = 0; col < playfield; col++) {
			if(playfield[row][col] == square) {
				return {north:row-1, south:row+1, west:col-1, east:col+1};
			}
		}
	}
	return {north:null, south:null, west:null, east:null};
};