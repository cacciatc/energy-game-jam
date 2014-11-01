function Cable(entrance, exit) {
	this._entrance = entrance;
	this._exit = exit;
	this._state = false;
};

/* constants */
Cable.NORTH = "NORTH";
Cable.SOUTH = "SOUTH";
Cable.EAST  = "EAST";
Cable.WEST  = "WEST";

Cable.prototype = {
	entrance: function() {
		return this._entrance;
	},

	exit: function() {
		return this._exit;
	},

	state: function() {
		return this._state;
	},

	on: function() {
		this._state = true;
	},

	off: function() {
		this._state = false;
	}
};

/* factory methods */
Cable.cable1 = function() {
	return new Cable(this.NORTH, this.SOUTH);
};

Cable.cable2 = function() {
	return new Cable(this.NORTH, this.EAST);
};

Cable.cable3 = function() {
	return new Cable(this.NORTH, this.WEST);
};

Cable.cable4 = function() {
	return new Cable(this.SOUTH, this.EAST);
};

Cable.cable5 = function() {
	return new Cable(this.SOUTH, this.WEST);
};

Cable.cable6 = function() {
	return new Cable(this.WEST, this.EAST);
};