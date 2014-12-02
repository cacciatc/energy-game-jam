function FOPLogic() {

};

FOPLogic.prototype.fixLocation = function(item) {
	var x = 4 * CableSprite.width;
	var y = 4 * CableSprite.height;

	var width = 15 * CableSprite.width;
	var height = 5 * CableSprite.height;

	if(item.x >= x && item.x <= x + width &&
		item.y >= y && item.y <= y + height) {

		var col = Math.round((item.x + CableSprite.width/2) / CableSprite.width);
		var row = Math.round((item.y + CableSprite.height/2) / CableSprite.height);

		//nearest x
		var item_x = (col * CableSprite.width) - CableSprite.width/2;
		//nearest y
		var item_y = (row * CableSprite.height) - CableSprite.height/2;

		var col2 = Math.round((item.x + CableSprite.width/2 - x) / CableSprite.width) - 1;
		var row2 = Math.round((item.y + CableSprite.height/2 - y) / CableSprite.height) - 1;

		item.row = col2;
		item.col = row2;

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
			t.to({ y: game.cable_queue[j].y + CableSprite.height }, 500, Phaser.Easing.Bounce.Out).delay(500 - (j*50));
			t.start();

			game.cable_queue[j].orig_y = game.cable_queue[j].y + CableSprite.height;
		}

		var next_cable = game.cable_queue[game.cable_queue.length - 1];
		InputConfig.setupTouch(next_cable);

		var cable_logic = game.cable_generator.next();
		
		var sprite = CableSprite.create(cable_logic, 64 + CableSprite.width/2, 0 + CableSprite.height/2);

		UtilityTweens.cableToNormalSize(sprite);

		game.time.events.add(1000, function() {
			game.incomingSound.play();
		}, this);

		game.cable_queue.reverse();
		game.cable_queue.push(sprite);
		game.cable_queue.reverse();

		game.play_field.forEach(function(square) {
	        square.cable_logic.off();
	        if(game.source != square) {
	     	   square.energy_type = null;
	     	   square.frame = square.orig_frame;
	    	}
	        square.alpha = 1.0;
    	});

		game.flow_manager.update(game.source, game.play_field);

		/* if the sink is on, then the level is over */
		if(game.sink.cable_logic.state() == true) {
			var sp2 = game.add.sprite((5*CableSprite.width) + (15*CableSprite.width/2), (CableSprite.height*7) + (3*CableSprite.height/2), 'game-won');
			var t4 = game.add.tween(sp2.scale);

			sp2.scale.x = 0;
			sp2.scale.y = 0;
			sp2.anchor.x = 0.5;
			sp2.anchor.y = 0.5;

			t4.to({ x: 1.0, y: 1.0 }, 2000, Phaser.Easing.Bounce.Out).delay(0);
			t4.start();
		}
	}
	else {
		UtilityTweens.returnCable(item);
	}
};