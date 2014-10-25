
describe("A cable", function() {
	it("should be testable", function() {
		expect(new Cable()).not.toBe(null);
	});

	it("should have an entrance", function() {
		var cable = new Cable(Cable.NORTH, Cable.SOUTH);
	
		expect(cable.entrance()).toBe(Cable.NORTH);
	});

	it("should have an exit", function() {
		var cable = new Cable(Cable.NORTH, Cable.SOUTH);
	
		expect(cable.exit()).toBe(Cable.SOUTH);
	});

	it("should have an on/off state", function() {
		var cable = new Cable();

		expect(cable.state()).toBe(false);

		cable.on();

		expect(cable.state()).toBe(true);

		cable.off();

		expect(cable.state()).toBe(false);
	});
});