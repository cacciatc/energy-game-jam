function Playfield(width, height) {
	this._map = [];
	this._width = width;
	this._height = height;

	for(var row = 0; row < width; row++) {
        this._map[row] = [];
        for(var col = 0; col < height; col++) {
           this._map[row][col] = null;
        }
    }
};

Playfield.prototype.get = function(x, y) {
	if(x < 0 || x >= this._width || y < 0 || y >= this._height) {
		return null;
	}
	return this._map[x][y];
};

Playfield.prototype.set = function(x, y, sprite) {
	if(x < 0 || x >= this._width || y < 0 || y >= this._height) {
		return;
	}
	var oldSprite = this._map[x][y];

	this._map[x][y] = sprite;
	return oldSprite;
};

Playfield.prototype.width = function() {
	return this._width;
};

Playfield.prototype.height = function() {
	return this._height;
};

Playfield.prototype.neighbors = function(square) {
	var x = null,
		y = null;

	for(var row = 0; row < this._width; row++) {
        for(var col = 0; col < this._height; col++) {
           if(this._map[row][col] == square) {
           		x = row;
           		y = col;
           }
        }
    }
    
	return {
		north: this.get(x, y - 1),
		south: this.get(x, y + 1), 
		west:  this.get(x - 1, y), 
		east:  this.get(x + 1, y)
	};
};

Playfield.prototype.forEach = function(fn) {
	for(var row = 0; row < this._width; row++) {
        for(var col = 0; col < this._height; col++) {
        	if(this._map[row][col] != null) {
        		fn(this._map[row][col]);
        	}
        }
    }
};