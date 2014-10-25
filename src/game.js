// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game_div');
var game_state = {};

// Creates a new 'main' state that wil contain the game
game_state.main = function() { };  
game_state.main.prototype = {

    preload: function() { 
		// Function called first to load all the assets
        game.load.tilemap('pipecity', 'res/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('pipequeue', 'res/gfx/background-tiles.png', 32, 32);
        game.load.image('tiles', 'res/gfx/background-tiles.png');

    },

    create: function() { 
    	// Fuction called after 'preload' to setup the game
    map = game.add.tilemap('pipecity');
    map.addTilesetImage('tilez', 'tiles');

    layer1 = map.createLayer('Tile Layer 1');
    layer1.resizeWorld();

        var sprite = game.add.sprite(32, -162, 'pipequeue', 8);
        var sprite1 = game.add.sprite(32, -130, 'pipequeue', 6);

        var group = game.add.group();
        group.add(sprite);
        group.add(sprite1);
        group.y = -162;
        console.log(group.length);

    var tween = game.add.tween(group);
    tween.to({ y: 290 }, 3000, Phaser.Easing.Exponential.Out);
    tween.start();

    },
    
    update: function() {
        if (game.input.keyboard.justReleased(Phaser.Keyboard.LEFT) )
        {
            var sprite = game.add.sprite(game.rnd.integer() % 800, game.rnd.integer() % 640, 'pipequeue', 6);

        }
    },
};

// Add and start the 'main' state to start the game
game.state.add('main', game_state.main);  
game.state.start('main'); 