function LevelLoader() {

};

LevelLoader.load = function(level) {
	if(level == 1) {
		return this.level1;
	}
	else if(level == 2) {
		return this.level2;
	}
};

LevelLoader.LEVEL1 = 'level1';

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
	source: {x:0, y:3, xp:256, yp:256},
	sink: 	{x:6, y:7, xp:640, yp:512}
};

LevelLoader.LEVEL1 = 'level2';

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
	source: {x:0, y:0, xp:256, yp:64},
	sink: 	{x:9, y:4, xp:832, yp:64+256}
};