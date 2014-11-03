function CableSprite() {

};

CableSprite.create = function(cable_logic, x, y) {
	var frame = 0;

	if(cable_logic.entrance() == Cable.NORTH && cable_logic.exit() == Cable.SOUTH) {
		frame = 4;
	}
	else if(cable_logic.entrance() == Cable.NORTH && cable_logic.exit() == Cable.WEST) {
		frame = 15;
	}
	else if(cable_logic.entrance() == Cable.NORTH && cable_logic.exit() == Cable.EAST) {
		frame = 12;
	}
	else if(cable_logic.entrance() == Cable.SOUTH && cable_logic.exit() == Cable.EAST) {
		frame = 0;
	}
	else if(cable_logic.entrance() == Cable.SOUTH && cable_logic.exit() == Cable.WEST) {
		frame = 3;
	}
	else if(cable_logic.entrance() == Cable.WEST && cable_logic.exit() == Cable.EAST) {
		frame = 1;
	}

	var sprite = game.add.sprite(x, y, 'foreground-tiles', frame);

	sprite.cable_logic = cable_logic;

	sprite.scale.x = 0.0;
	sprite.scale.y = 0.0;

	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;

	sprite.orig_x = sprite.x;
	sprite.orig_y = sprite.y;

	return sprite;
};
