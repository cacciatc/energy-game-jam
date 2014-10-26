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

	// for any if there is a cable determine if the entrance or exit is the direction im approaching from
	// if so, turn it on
	// if not, turn it out
	// if sink, game won!!!
};

FlowManager.prototype.rupdate = function(current, neighbor, dir, sink, playfield) {
	if(current == null) {
		return;
	}

	var cable = current.cable_logic;
	if(dir == Cable.NORTH && (cable.entrance() == Cable.NORTH || cable.entrance() == Cable.SOUTH || 
		cable.exit() == Cable.NORTH || cable.exit() == Cable.SOUTH)) {
		cable.on();
		var tween = game.add.tween(current);
            tween.to({ alpha: 0.3 }, 100, Phaser.Easing.Bounce.Out);
            tween.start();
	}
	else if(dir == Cable.NORTH && (cable.entrance() == Cable.NORTH || cable.entrance() == Cable.EAST || 
		cable.exit() == Cable.NORTH || cable.exit() == Cable.EAST)) {
		cable.on();
		var tween = game.add.tween(current);
            tween.to({ alpha: 0.3 }, 100, Phaser.Easing.Bounce.Out);
            tween.start();
	}
	else if(dir == Cable.NORTH && (cable.entrance() == Cable.NORTH || cable.entrance() == Cable.WEST || 
		cable.exit() == Cable.NORTH || cable.exit() == Cable.WEST)) {
		cable.on();
		var tween = game.add.tween(current);
            tween.to({ alpha: 0.3 }, 100, Phaser.Easing.Bounce.Out);
            tween.start();
	}
	else if(dir == Cable.SOUTH && (cable.entrance() == Cable.NORTH || cable.entrance() == Cable.SOUTH || 
		cable.exit() == Cable.NORTH || cable.exit() == Cable.SOUTH)) {
		cable.on();
		var tween = game.add.tween(current);
            tween.to({ alpha: 0.3 }, 100, Phaser.Easing.Bounce.Out);
            tween.start();
	}
	else if(dir == Cable.SOUTH && (cable.entrance() == Cable.SOUTH || cable.entrance() == Cable.EAST || 
		cable.exit() == Cable.EAST || cable.exit() == Cable.SOUTH)) {
		cable.on();
		var tween = game.add.tween(current);
            tween.to({ alpha: 0.3 }, 100, Phaser.Easing.Bounce.Out);
            tween.start();
	}
	else if(dir == Cable.SOUTH && (cable.entrance() == Cable.SOUTH || cable.entrance() == Cable.WEST || 
		cable.exit() == Cable.WEST || cable.exit() == Cable.SOUTH)) {
		cable.on();
		var tween = game.add.tween(current);
            tween.to({ alpha: 0.3 }, 100, Phaser.Easing.Bounce.Out);
            tween.start();
	}
	else {
		cable.off();
	}
};

FlowManager.prototype.neighbors = function(square, playfield) {
	for(var row = 0; row < 11; row++) {
		for(var col = 0; col < 17; col++) {
			if(playfield[row] != null && playfield[row][col] == square) {
				var north = null;
				var south = null;
				var west = null;
				var east = null;

				if(playfield[row-1] != null && playfield[row-1][col] != null) {
					north = playfield[row-1][col]
				}
				if(playfield[row+1] != null && playfield[row+1][col] != null) {
					south = playfield[row+1][col]
				}
				if(playfield[row] != null && playfield[row][col-1] != null) {
					west = playfield[row][col-1]
				}
				if(playfield[row] != null && playfield[row][col+1] != null) {
					east = playfield[row][col+1]
				}
				return {north:north, south:south, west:west, east:east};
			}
		}
	}
	return {north:null, south:null, west:null, east:null};
};