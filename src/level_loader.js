function LevelLoader() {

};

LevelLoader.load = function(level) {
	if(level == this.LEVEL1) {
		return this.level1;
	}
};

LevelLoader.LEVEL1 = 'level1';

LevelLoader.level1 = new CableGenerator([
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
].reverse());