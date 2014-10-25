function CableGenerator(a) {
	this._cables = a || [];
	this._ptr = 0;
};

CableGenerator.prototype.next = function() {
	var cable = null;

	if(this._cables.length == 0) {
		return cable;
	}
	else {
		cable = this._cables[this._ptr];
		this._ptr++;

		if(this._ptr >= this._cables.length) {
			this._ptr = 0;
		}
	}

	return cable;
};