function InputConfig() {

};

InputConfig.setupTouch = function(sprite) {
	sprite.inputEnabled = true;
	sprite.input.enableDrag(true);

	sprite.events.onDragStart.add(function(item) {
		UtilityTweens.cableSelected(item);
	});
	sprite.events.onDragStop.add(game.fop_logic.fixLocation);
};