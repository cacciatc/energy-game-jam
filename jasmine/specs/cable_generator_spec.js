// it should loop around if we run out of cables

describe("A cable generator", function() {
	it("should be testable", function() {
		expect(new CableGenerator([])).not.toBe(null);
	});

	it("should give the next cable", function() {
		var gen = new CableGenerator([
			new Cable()
		]);

		expect(gen.next()).not.toBe(null);
	});

	it("should loop if the cables run out", function() {
		var cable1 = new Cable();
		var cable2 = new Cable();

		var gen = new CableGenerator([
			cable1, cable2
		]);

		expect(gen.next()).toBe(cable1);
		expect(gen.next()).toBe(cable2);
		expect(gen.next()).toBe(cable1);
	});
});