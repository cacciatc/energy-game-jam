function FlowManager() {
	this.callIfNotNull = function(fn, item1, item2) {
		if(fn != null) {
			fn(item1, item2);
		}
	};

	this.rupdate = function(current, neighbor, dir, playfield) {
		if(current == null) {
			return;
		}

		if(current == game.sink) {
			current.cable_logic.on();
			return;
		}

		var cable = current.cable_logic;
		var isOn = false;

		if(dir == Cable.NORTH && (cable.entrance() == Cable.SOUTH || cable.exit() == Cable.SOUTH)) {
			cable.on();
			isOn = true;
		}
		else if(dir == Cable.SOUTH && (cable.entrance() == Cable.NORTH || cable.exit() == Cable.NORTH)) {
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

		if(isOn == true) {
			current.energy_type = neighbor.energy_type + "";

			this.callIfNotNull(current.onCallback, current, neighbor);

			var neighbors = playfield.neighbors(current);
		
			if(cable.exit() == Cable.NORTH || cable.entrance() == Cable.NORTH){
				if(neighbors.north != null && neighbors.north != neighbor)
					this.rupdate(neighbors.north, current, Cable.NORTH, playfield);
			}
			if(cable.exit() == Cable.SOUTH || cable.entrance() == Cable.SOUTH){
				if(neighbors.south != null && neighbors.south != neighbor)
					this.rupdate(neighbors.south, current, Cable.SOUTH, playfield);
			}
			if(cable.exit() == Cable.EAST || cable.entrance() == Cable.EAST){
				if(neighbors.east != null && neighbors.east != neighbor)
					this.rupdate(neighbors.east, current, Cable.EAST, playfield);
			}
			if(cable.exit() == Cable.WEST || cable.entrance() == Cable.WEST){
				if(neighbors.west != null && neighbors.west != neighbor)
					this.rupdate(neighbors.west, current, Cable.WEST, playfield);
			}
		}
	};
};


FlowManager.prototype.update = function(source, playfield) {
	if(source == null) {
		return;
	}

	source.cable_logic.on();
	this.callIfNotNull(source.onCallback, source, source);

	var neighbors = playfield.neighbors(source);
	
	this.rupdate(neighbors.north, source, Cable.NORTH, playfield);
	this.rupdate(neighbors.south, source, Cable.SOUTH, playfield);
	this.rupdate(neighbors.east,  source, Cable.EAST, playfield);
	this.rupdate(neighbors.west,  source, Cable.WEST, playfield);
};