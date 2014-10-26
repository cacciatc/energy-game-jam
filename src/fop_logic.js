function FOPLogic() {

};

FOPLogic.prototype.fixLocation = function(item) {
	var x = 6 * 32;
	var y = 5 * 32;

	var width = 17 * 32;
	var height = 12 * 32;

	if(item.x >= x && item.x <= x + width &&
		item.y >= y && item.y <= y + height) {

		//nearest x
		var item_x = (Math.round((item.x + 16) / 32) * 32) - 16;
		//nearest y
		var item_y = (Math.round((item.y + 16) / 32) * 32) - 16;

		var tween = game.add.tween(item);
		var tween2 = game.add.tween(item);
		var tween3 = game.add.tween(item.scale);

		tween2.to({ x: item_x, y: item_y }, 100, Phaser.Easing.Bounce.Out);
		tween2.start();

		tween3.to({ x: 1.2, y: 1.2 }, 300, Phaser.Easing.Cubic.InOut, false, 0, 0, true);
		tween3.start();

		tween.to({ alpha: 1.0 }, 200, Phaser.Easing.Circular.InOut).delay(100);
		tween.start();

		item.inputEnabled = false;
        item.input.enableDrag(false);

		// tween queue down
		game.cable_queue.pop();

		for(var j = game.cable_queue.length-1; j >= 0; j--) {
			var t = game.add.tween(game.cable_queue[j]);
        	t.to({ y: game.cable_queue[j].y + 32 }, 500, Phaser.Easing.Bounce.Out).delay(500 - (j*50));
       		t.start();

        	game.cable_queue[j].orig_y = game.cable_queue[j].y + 32;
		}

		var next_cable = game.cable_queue[game.cable_queue.length - 1];
		next_cable.inputEnabled = true;
        next_cable.input.enableDrag(true);

        next_cable.events.onDragStart.add(function(item) {
	       	 if(game.cable_queue[game.cable_queue.length-1] == item){
                var alpha_tween = game.add.tween(item);
                    
                alpha_tween.to({ alpha: 0.5 }, 100, Phaser.Easing.Circular.InOut).delay(100);
                alpha_tween.start();
            }
        });
        next_cable.events.onDragStop.add(game.fop_logic.fixLocation);

        var cable_logic = game.cable_generator.next();
        var frame = 0;

        if(cable_logic.entrance() == Cable.NORTH && cable_logic.exit() == Cable.SOUTH) {
            frame = 4;
        }
        else if(cable_logic.entrance() == Cable.NORTH && cable_logic.exit() == Cable.WEST) {
            frame = 8;
        }
        else if(cable_logic.entrance() == Cable.NORTH && cable_logic.exit() == Cable.EAST) {
            frame = 5;
        }
        else if(cable_logic.entrance() == Cable.SOUTH && cable_logic.exit() == Cable.EAST) {
            frame = 3;
        }
        else if(cable_logic.entrance() == Cable.SOUTH && cable_logic.exit() == Cable.WEST) {
            frame = 7;
        }
        else if(cable_logic.entrance() == Cable.WEST && cable_logic.exit() == Cable.EAST) {
            frame = 6;
        }

        var sprite = game.add.sprite(64 + 16, 0 + 16, 'foreground-tiles', frame);
        
        sprite.scale.x = 0.0;
        sprite.scale.y = 0.0;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;

        sprite.orig_x = sprite.x;
        sprite.orig_y = sprite.y;

        var tween = game.add.tween(sprite.scale);
        tween.to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Bounce.Out).delay(700);
        tween.start();

        sprite.cable_logic = cable_logic;

        game.cable_queue.reverse();
        game.cable_queue.push(sprite);
        game.cable_queue.reverse();
	}
	else {
		var tween = game.add.tween(item);
		var tween2 = game.add.tween(item);

		tween.to({ x: item.orig_x, y: item.orig_y }, 1000, Phaser.Easing.Circular.Out).delay(100);
		tween2.to({ alpha: 1.0 }, 500, Phaser.Easing.Circular.InOut).delay(100);

        tween.start();
        tween2.start();
	}
};