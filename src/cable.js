function Cable(entrance, exit) {
	this._entrance = entrance;
	this._exit = exit;
	this._state = false;
};

Cable.prototype.entrance = function() {
	return this._entrance;
};

Cable.prototype.exit = function() {
	return this._exit;
};

Cable.prototype.state = function() {
	return this._state;
};

Cable.prototype.on = function() {
	this._state = true;
};

Cable.prototype.off = function() {
	this._state = false;
};

Cable.NORTH = "NORTH";
Cable.SOUTH = "SOUTH";
Cable.EAST = "EAST";
Cable.WEST = "WEST";
