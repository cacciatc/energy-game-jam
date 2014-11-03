function FOPLogic() {

};

FOPLogic.prototype.fixLocation = function(item) {
	var x = 6 * 32;
	var y = 5 * 32;

	var width = 17 * 32;
	var height = 12 * 32;

	if(item.x >= x && item.x <= x + width &&
		item.y >= y && item.y <= y + height) {

		var col = Math.round((item.x + 16) / 32);
		var row = Math.round((item.y + 16) / 32);

		//nearest x
		var item_x = (col * 32) - 16;
		//nearest y
		var item_y = (row * 32) - 16;

		var col2 = Math.round((item.x + 16 - x) / 32) - 1;
		var row2 = Math.round((item.y + 16 - y) / 32) - 1; 

		if(game.play_field.get(col2, row2) != null) {
			var old = game.play_field.set(col2, row2, item);

			old.cable_logic.off();
			old.destroy();

			game.removeSound.play();
		}
		else {
			game.play_field.set(col2, row2, item);
			game.placementSound.play();
		}

		UtilityTweens.snapToGrid(item, item_x, item_y);
		UtilityTweens.cableGrow(item);
		UtilityTweens.cableUnselected(item);

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
		InputConfig.setupTouch(next_cable);

		var cable_logic = game.cable_generator.next();
		
		var sprite = CableSprite.create(cable_logic, 64 + 16, 0 + 16);

		UtilityTweens.cableToNormalSize(sprite);

		game.time.events.add(1000, function() {
			game.incomingSound.play();
		}, this);

		game.cable_queue.reverse();
		game.cable_queue.push(sprite);
		game.cable_queue.reverse();

		game.play_field.forEach(function(square) {
        	/*if(square.alph2 != null)
        	square.alph2.stop();
        	if(square.alph != null)
        	square.alph.stop();
        	square.alpha = 1.0;*/
        	square.cable_logic.off();
        	square.alpha = 1.0;
        });

		game.flow_manager.update(game.source, game.play_field);
	}
	else {
		UtilityTweens.returnCable(item);
	}
};