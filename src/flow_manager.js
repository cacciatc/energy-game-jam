function FlowManager() {

};


FlowManager.prototype.update = function(source, sink, playfield) {
	if(source == sink) {
		return;
	}
	var neighbors = this.neighbors(source, playfield);
	
	this.rupdate(neighbors.north, source, Cable.NORTH, sink, playfield);
	this.rupdate(neighbors.south, source, Cable.SOUTH, sink, playfield);
	this.rupdate(neighbors.east, source, Cable.EAST, sink, playfield);
	this.rupdate(neighbors.west, source, Cable.WEST, sink, playfield);

	// if sink, game won!!!
};

FlowManager.prototype.rupdate = function(current, neighbor, dir, sink, playfield) {
	if(current == null) {
		return;
	}

	var cable = current.cable_logic;
	var isOn = false;

	if(cable == null) {
		console.log(current);
	}
	if(dir == Cable.NORTH && (cable.entrance() == Cable.SOUTH || cable.exit() == Cable.SOUTH)) {
		cable.on();
		isOn = true;
	}
	/* south dir */
	else if(dir == Cable.SOUTH && (cable.entrance() == Cable.NORTH || cable.exit() == NORTH)) {
		cable.on();
		isOn = true;
	} 
	else if(dir == Cable.EAST && (cable.entrance() == Cable.WEST || cable.exit() == Cable.WEST)) {
		cable.on();
		isOn = true;
	}
	else if(dir == Cable.WEST && (cable.entrance() == Cable.EAST || cable.exit() == Cable.EAST)) {
		cable.on();
		isOn = true;
	}
	else {
		cable.off();
	}

	if(isOn == true) {
		//current.frame = 2;
		if(current.alph == null) {
			current.alph = game.add.tween(current);
	                        
	       	current.alph.to({ alpha: 0.5 }, 500, Phaser.Easing.Circular.InOut);
	       	current.alph.start();

	       	current.alph.onComplete.add(function (item) {
	       		current.alph2 = game.add.tween(item);
	       		current.alph2.to({ alpha: 1.0 }, 500, Phaser.Easing.Circular.InOut);
	       		current.alph2.onComplete.add(function (item) {
	       			item.alph.start();
	       		});
	       		current.alph2.start();
	       	});
    	}

		var neighbors = this.neighbors(current, playfield);
	
		if(cable.exit() == Cable.NORTH || cable.entrance() == Cable.NORTH){
				if(neighbors.north != null && neighbors.north != neighbor)
				this.rupdate(neighbors.north, current, Cable.NORTH, sink, playfield);
		}
		if(cable.exit() == Cable.SOUTH || cable.entrance() == Cable.SOUTH){
				if(neighbors.south != null && neighbors.south != neighbor)
				this.rupdate(neighbors.south, current, Cable.SOUTH, sink, playfield);
		}
		if(cable.exit() == Cable.EAST || cable.entrance() == Cable.EAST){
				if(neighbors.east != null && neighbors.east != neighbor)
				this.rupdate(neighbors.east, current, Cable.EAST, sink, playfield);
		}
		if(cable.exit() == Cable.WEST || cable.entrance() == Cable.WEST){
				if(neighbors.west != null && neighbors.west != neighbor)
				this.rupdate(neighbors.west, current, Cable.WEST, sink, playfield);
		}
	}
};

FlowManager.prototype.neighbors = function(square, playfield) {

	for(var row = 0; row < playfield.length; row++) {
		for(var col = 0; col < playfield[row].length; col++) {
			if(playfield[row] != null && playfield[row][col] == square) {
				var north = null;
				var south = null;
				var west = null;
				var east = null;

				if(playfield[row-1] != null && playfield[row-1][col] != null) {
					north = playfield[row-1][col];
				}
				if(playfield[row+1] != null && playfield[row+1][col] != null) {
					south = playfield[row+1][col];
				}
				if(playfield[row] != null && playfield[row][col-1] != null) {
					west = playfield[row][col-1];
				}
				if(playfield[row] != null && playfield[row][col+1] != null) {
					east = playfield[row][col+1];
				}
				return {north:north, south:south, west:west, east:east};
			}
		}
	}
	/*for(var row = 0; row < 11; row++) {
		for(var col = 0; col < 17; col++) {
			if(playfield[row] != null && playfield[row][col] == square) {
				var north = null;
				var south = null;
				var west = null;
				var east = null;

				if(playfield[row-1] != null && playfield[row-1][col] != null) {
					north = playfield[row-1][col];
				}
				if(playfield[row+1] != null && playfield[row+1][col] != null) {
					south = playfield[row+1][col];
				}
				if(playfield[row] != null && playfield[row][col-1] != null) {
					west = playfield[row][col-1];
				}
				if(playfield[row] != null && playfield[row][col+1] != null) {
					east = playfield[row][col+1];
				}
				return {north:north, south:south, west:west, east:east};
			}
		}
	}*/
	return {north:null, south:null, west:null, east:null};
};