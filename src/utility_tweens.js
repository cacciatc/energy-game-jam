function UtilityTweens() {

};

UtilityTweens.returnCable = function(sprite) {
	var trans_tween = game.add.tween(sprite);
	var alpha_tween = game.add.tween(sprite);

	trans_tween.to({ 
		x: sprite.orig_x, 
		y: sprite.orig_y 
	}, 1000, Phaser.Easing.Circular.Out)
	.delay(100);

	alpha_tween.to({ 
		alpha: 1.0 
	}, 500, Phaser.Easing.Circular.InOut)
	.delay(100);

    trans_tween.start();
    alpha_tween.start();
};

UtilityTweens.cableToNormalSize = function(sprite) {
	var tween = game.add.tween(sprite.scale);
    
    tween.to({ 
    	x: 1.0, 
    	y: 1.0 
    }, 1000, Phaser.Easing.Bounce.Out)
    .delay(700);

    tween.start();
};

UtilityTweens.cableSelected = function(sprite) {
	var tween = game.add.tween(sprite);
                    
    tween.to({ 
    	alpha: 0.5 
    }, 100, Phaser.Easing.Circular.InOut)
    .delay(100);

    tween.start();
};

UtilityTweens.snapToGrid = function(sprite, x, y) {
	var tween = game.add.tween(sprite);

	tween.to({ 
		x: x, 
		y: y 
	}, 100, Phaser.Easing.Bounce.Out);

	tween.start();
};

UtilityTweens.cableGrow = function(sprite) {
	var tween = game.add.tween(sprite.scale);	

	tween.to({ 
		x: 1.2, 
		y: 1.2 
	}, 300, Phaser.Easing.Cubic.InOut, false, 0, 0, true);

	tween.start();
};

UtilityTweens.cableUnselected = function(sprite) {
	var tween = game.add.tween(sprite);

	tween.to({ 
		alpha: 1.0 
	}, 200, Phaser.Easing.Circular.InOut)
	.delay(100);

	tween.start();
};

UtilityTweens.fadeInCable = function(sprite) {
	var tween = game.add.tween(sprite);
                        
    tween.to({ 
    	alpha: 1.0 
    }, 1000, Phaser.Easing.Circular.InOut)
    .delay(800);

    tween.start();
};