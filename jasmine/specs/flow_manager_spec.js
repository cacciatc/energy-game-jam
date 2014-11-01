describe("A flow manager", function() {
	var createSprite = function(port1, port2) {
		return {
			cable_logic: new Cable(port1, port2),
			onCallback: function(sprite) {
				sprite.on_called = true;
			},
			offCallback: function(sprite) {
				sprite.off_called = true;
			}
		};
	};

	it("should be testable", function() {
		expect(new FlowManager()).not.toBe(null);
	});

	it("should find all connected sprites", function() {
		var sprite1 = createSprite(Cable.EAST,  Cable.SOUTH),
			sprite2 = createSprite(Cable.NORTH, Cable.EAST),
			sprite3 = createSprite(Cable.WEST,  Cable.SOUTH),
			sprite4 = createSprite(Cable.WEST,  Cable.EAST),
			sprite5 = createSprite(Cable.WEST,  Cable.EAST);

		var pf = new Playfield(5, 5);
		var man = new FlowManager();

		pf.set(0, 0, sprite1);
		pf.set(0, 1, sprite2);
		pf.set(1, 1, sprite3);
		pf.set(1, 0, sprite5);
		pf.set(4, 4, sprite4);

		man.update(sprite1, pf);

		expect(sprite1.cable_logic.state()).toBe(true);
		expect(sprite2.cable_logic.state()).toBe(true);
		expect(sprite3.cable_logic.state()).toBe(true);
		expect(sprite4.cable_logic.state()).toBe(false);
		expect(sprite5.cable_logic.state()).toBe(true);
	});

	it("should find all connected sprites in a path", function() {
		var sprite1 = createSprite(Cable.EAST,  Cable.WEST),
			sprite2 = createSprite(Cable.EAST,  Cable.WEST),
			sprite3 = createSprite(Cable.WEST,  Cable.SOUTH),
			sprite4 = createSprite(Cable.NORTH, Cable.EAST),
			sprite5 = createSprite(Cable.WEST,  Cable.EAST);

		var pf = new Playfield(5, 5);
		var man = new FlowManager();

		pf.set(0, 0, sprite1);
		pf.set(1, 0, sprite2);
		pf.set(2, 0, sprite3);
		pf.set(2, 1, sprite4);
		pf.set(3, 1, sprite5);

		man.update(sprite1, pf);

		expect(sprite1.cable_logic.state()).toBe(true);
		expect(sprite2.cable_logic.state()).toBe(true);
		expect(sprite3.cable_logic.state()).toBe(true);
		expect(sprite4.cable_logic.state()).toBe(true);
		expect(sprite5.cable_logic.state()).toBe(true);
	});

	it("should work even when sprites are replaced", function() {
		var sprite1 = createSprite(Cable.EAST,  Cable.WEST),
			sprite2 = createSprite(Cable.EAST,  Cable.WEST),
			sprite3 = createSprite(Cable.WEST,  Cable.SOUTH),
			sprite4 = createSprite(Cable.NORTH, Cable.EAST),
			sprite5 = createSprite(Cable.WEST,  Cable.EAST),
			sprite6 = createSprite(Cable.WEST, Cable.NORTH);

		var pf = new Playfield(5, 5);
		var man = new FlowManager();

		pf.set(0, 0, sprite1);
		pf.set(1, 0, sprite2);
		pf.set(2, 0, sprite3);
		pf.set(2, 1, sprite4);
		pf.set(3, 1, sprite5);

		man.update(sprite1, pf);

		pf.set(1, 0, sprite6);

		pf.forEach(function(square) {
        	square.cable_logic.off();
        });
		man.update(sprite1, pf);

		expect(sprite1.cable_logic.state()).toBe(true);
		expect(sprite6.cable_logic.state()).toBe(true);
		// this one would have to be explicitly set off
		expect(sprite2.cable_logic.state()).toBe(true);
		expect(sprite3.cable_logic.state()).toBe(false);
		expect(sprite4.cable_logic.state()).toBe(false);
		expect(sprite5.cable_logic.state()).toBe(false);
	});

	// it should provide callbacks for animations when sprites beceome connected or disconnected
});