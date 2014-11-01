function CableSprite() {

};

CableSprite.configure = function(sprite) {
	sprite.scale.x = 0.0;
    sprite.scale.y = 0.0;

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    sprite.orig_x = sprite.x;
    sprite.orig_y = sprite.y;
};
