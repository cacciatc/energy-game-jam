function CableSprite() {

};

CableSprite.create = function(cable_logic, x, y) {
	var frame = 0;

	if(cable_logic.entrance() == Cable.NORTH && cable_logic.exit() == Cable.SOUTH) {
		frame = 15;
	}
	else if(cable_logic.entrance() == Cable.NORTH && cable_logic.exit() == Cable.WEST) {
		frame = 17;
	}
	else if(cable_logic.entrance() == Cable.NORTH && cable_logic.exit() == Cable.EAST) {
		frame = 16;
	}
	else if(cable_logic.entrance() == Cable.SOUTH && cable_logic.exit() == Cable.EAST) {
		frame = 19;
	}
	else if(cable_logic.entrance() == Cable.SOUTH && cable_logic.exit() == Cable.WEST) {
		frame = 18;
	}
	else if(cable_logic.entrance() == Cable.WEST && cable_logic.exit() == Cable.EAST) {
		frame = 20;
	}

	var sprite = game.add.sprite(x, y, 'abstract-foreground', frame);

	sprite.orig_frame = frame;

	sprite.cable_logic = cable_logic;

	sprite.scale.x = 0.0;
	sprite.scale.y = 0.0;

	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;

	sprite.orig_x = sprite.x;
	sprite.orig_y = sprite.y;

	return sprite;
};

CableSprite.width = 64;
CableSprite.height = 64;
