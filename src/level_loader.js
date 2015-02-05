function LevelLoader() {

};

LevelLoader.load = function(level) {
	if(level == 1) {
		return this.level1;
	}
	else if(level == 2) {
		return this.level2;
	}
	else if(level == 3) {
		return this.level3;
	}
};

LevelLoader.level1 = {
	generator: new CableGenerator([
					Cable.cable1(),
					Cable.cable2(),
					Cable.cable6(),
					Cable.cable5(),
					Cable.cable1(),
					Cable.cable1(),
					Cable.cable2(),
					Cable.cable5(),
					Cable.cable3(),
					Cable.cable4(),
					Cable.cable2(),
					Cable.cable6(),
					Cable.cable6(),
					Cable.cable5()
				].reverse()),
	sources: [{x:0, y:3, xp:256, yp:256, energy:"wind"}],
	sinks: 	[{x:6, y:7, xp:640, yp:512}]
};

LevelLoader.level2 = {
	generator: new CableGenerator([
					Cable.cable1(),
					Cable.cable2(),
					Cable.cable6(),
					Cable.cable5(),
					Cable.cable1(),
					Cable.cable1(),
					Cable.cable2(),
					Cable.cable5(),
					Cable.cable3(),
					Cable.cable4(),
					Cable.cable2(),
					Cable.cable6(),
					Cable.cable6(),
					Cable.cable5()
				].reverse()),
	sources: [
				{x:0, y:0, xp:256, yp:64, energy:"wind"},
				{x:13, y:1, xp:1088, yp:128, energy:"solar"}
			],
	sinks: 	[
				{x:9, y:4, xp:832, yp:64+256},
				{x:0, y:6, xp:256, yp:64+384}
			]
};

LevelLoader.level3 = {
	generator: new CableGenerator([
					Cable.cable1(),
					Cable.cable2(),
					Cable.cable6(),
					Cable.cable5(),
					Cable.cable1(),
					Cable.cable1(),
					Cable.cable2(),
					Cable.cable5(),
					Cable.cable3(),
					Cable.cable4(),
					Cable.cable2(),
					Cable.cable6(),
					Cable.cable6(),
					Cable.cable5()
				].reverse()),
	sources: [
				{x:0, y:0, xp:256, yp:64, energy:"geo"},
				{x:13, y:1, xp:1088, yp:128, energy:"geo"},
				{x:7, y:7, xp:256+448, yp:64+448, energy:"solar"},
				{x:2, y:4, xp:256+128, yp:64+256, energy:"wind"}
			],
	sinks: 	[
				{x:9, y:4, xp:832, yp:64+256},
				{x:0, y:6, xp:256, yp:64+384},
				{x:14, y:7, xp:256+896, yp:64+448}
			]
};