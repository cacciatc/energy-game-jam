function InputConfig() {

};

InputConfig.setupTouch = function(sprite) {
	sprite.inputEnabled = true;
	sprite.input.enableDrag(true);

	sprite.events.onDragStart.add(function(item) {
		/* only allow the last cable to be selected */
		if(game.cable_queue[game.cable_queue.length-1] == item){
			UtilityTweens.cableSelected(item);
		}
	});
	sprite.events.onDragStop.add(game.fop_logic.fixLocation);
};