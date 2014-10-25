// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game_div');
var game_state = {};

// Creates a new 'main' state that wil contain the game
game_state.main = function() { };  
game_state.main.prototype = {

    preload: function() { 
		// Function called first to load all the assets
        game.load.tilemap('pipecity', 'res/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('foreground-tiles', 'res/gfx/pipe-tiles.png', 32, 32);
        game.load.image('tiles', 'res/gfx/background-tiles.png');
    },

    create: function() { 
        map = game.add.tilemap('pipecity');
        map.addTilesetImage('background-tiles', 'tiles');

        var layer1 = map.createLayer('Background');
        layer1.resizeWorld();

        // create initial tiles
        this.cable_queue = [];
        this.cable_generator = new CableGenerator([
            new Cable(Cable.NORTH, Cable.SOUTH),
            new Cable(Cable.SOUTH, Cable.EAST),
            new Cable(Cable.SOUTH, Cable.WEST),
            new Cable(Cable.WEST, Cable.EAST),
            new Cable(Cable.NORTH, Cable.WEST),
            new Cable(Cable.NORTH, Cable.EAST)
        ]);

        this.QUEUE_SIZE = 9;
        for(var i = 0; i < this.QUEUE_SIZE; i++) {
            var cable_logic = this.cable_generator.next();
            var frame = 0;

            if(cable_logic.entrance() == Cable.NORTH && cable_logic.exit() == Cable.SOUTH) {
                frame = 4;
            }
            else if(cable_logic.entrance() == Cable.NORTH && cable_logic.exit() == Cable.WEST) {
                frame = 8;
            }
            else if(cable_logic.entrance() == Cable.NORTH && cable_logic.exit() == Cable.EAST) {
                frame = 5;
            }
            else if(cable_logic.entrance() == Cable.SOUTH && cable_logic.exit() == Cable.EAST) {
                frame = 3;
            }
            else if(cable_logic.entrance() == Cable.SOUTH && cable_logic.exit() == Cable.WEST) {
                frame = 7;
            }
            else if(cable_logic.entrance() == Cable.WEST && cable_logic.exit() == Cable.EAST) {
                frame = 6;
            }

            var sprite = game.add.sprite(64 + 16, 0 + (i*32) + 16, 'foreground-tiles', frame);
            sprite.scale.x = 0.0;
            sprite.scale.y = 0.0;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;

            var tween = game.add.tween(sprite.scale);
            tween.to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Bounce.Out).delay(500);
            tween.start();

            sprite.cable_logic = cable_logic;

            this.cable_queue.push(sprite);
        }
    },
    
    update: function() {

    },
};

// Add and start the 'main' state to start the game
game.state.add('main', game_state.main);  
game.state.start('main'); 