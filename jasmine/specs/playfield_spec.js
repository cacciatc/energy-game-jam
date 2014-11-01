describe("A playfield", function() {
	it("should be testable", function() {
		expect(new Playfield()).not.toBe(null);
	});

	it("should create a 2D map", function() {
		var pf = new Playfield(11, 11);
		var sprite = {};

		pf.set(10, 10, sprite);

		expect(pf.get(10, 10)).toBe(sprite);
		expect(pf.get(5, 5)).toBe(null);
	});

	it("should have a width and height", function() {
		var pf = new Playfield(11, 5);

		expect(pf.width()).toBe(11);
		expect(pf.height()).toBe(5);
	});

	it("should know the neighbors of a square", function() {
		var sprite1 = {};
		var sprite2 = {};
		var sprite3 = {};

		var playfield = new Playfield(10, 10);

		playfield.set(0, 0, sprite1);
		playfield.set(0, 1, sprite2);
		playfield.set(9, 2, sprite3);

		var expected = {
			north: null, south: sprite2, east: null, west: null
		};
		expect(playfield.neighbors(sprite1)).toEqual(expected);
	});

	it("should allow replacing squares", function() {
		var sprite1 = {};
		var sprite2 = {};

		var playfield = new Playfield(10, 10);

		playfield.set(0, 0, sprite1);
		var oldSprite = playfield.set(0, 0, sprite2);

		expect(playfield.get(0, 0)).toEqual(sprite2);
		expect(oldSprite).toEqual(sprite1);
	});
});