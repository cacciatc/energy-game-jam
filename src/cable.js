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

Cable.cable1 = function() {
	return new Cable(Cable.NORTH, Cable.SOUTH);
}
Cable.cable2 = function() {
	return new Cable(Cable.NORTH, Cable.EAST);
}
Cable.cable3 = function() {
	return new Cable(Cable.NORTH, Cable.WEST);
}
Cable.cable4 = function() {
	return new Cable(Cable.SOUTH, Cable.EAST);
}
Cable.cable5 = function() {
	return new Cable(Cable.SOUTH, Cable.WEST);
}
Cable.cable6 = function() {
	return new Cable(Cable.WEST, Cable.EAST);
}

Cable.NORTH = "NORTH";
Cable.SOUTH = "SOUTH";
Cable.EAST = "EAST";
Cable.WEST = "WEST";
