// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game_div');
var game_state = {};
var title_screen_state = {};

// Creates a new 'main' state that wil contain the game
title_screen_state.main = function() { };  
title_screen_state.main.prototype = {
    preload: function() { 
        game.load.image('title', 'res/gfx/game-title.png');

        game.load.tilemap('pipecity', 'res/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('foreground-tiles', 'res/gfx/powerlinesAlt.png', 32, 32);
       
        game.load.image('tiles', 'res/gfx/background-tiles.png');
        game.load.image('game-won', 'res/gfx/game-win.png');
        game.load.image('tiles2', 'res/gfx/background2.png');
        game.load.image('textimg', 'res/gfx/text.png');
        game.load.audio('placement', 'res/sfx/Placement.mp3');
        game.load.audio('remove', 'res/sfx/Overwrite.mp3');
        game.load.audio('incoming', 'res/sfx/BubbleBounce.mp3');
        game.load.spritesheet('foreground', 'res/gfx/foreground-tiles.png', 32, 32);
    },
    create: function() { 

        var sprite = game.add.sprite(0, 0, 'title');
        sprite.inputEnabled = true;
        game.title_done = false;
        sprite.events.onInputUp.add( function(item) {
            if(!game.title_done){
                //game.title_tween = game.add.tween(sprite);
                //game.title_tween.to({ y: 800.0 }, 1000, Phaser.Easing.Cubic.In).delay(0);
               // game.title_tween.start();

                /*game.title_tween.onComplete.add(function () {
                    if(game.title_done){
                        game.state.start('main'); 
                    }
                });*/

                game.title_tween = game.add.tween(sprite);
                game.title_tween.to({ alpha: 0.0 }, 1000, Phaser.Easing.Cubic.In).delay(0);
                game.title_tween.start();

                game.title_tween.onComplete.add(function () {
                    if(game.title_done){
                        game.state.start('main'); 
                    }
                });

                game.title_done = true;
             }
        });
    },
    update: function() {

    }
};

// Creates a new 'main' state that wil contain the game
game_state.main = function() { };  
game_state.main.prototype = {

    preload: function() { 
		// Function called first to load all the assets
       /* game.load.tilemap('pipecity', 'res/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('foreground-tiles', 'res/gfx/pipe-tiles.png', 32, 32);
        game.load.image('tiles', 'res/gfx/background-tiles.png');
        game.load.audio('placement', 'res/sfx/Placement.mp3');
        game.load.audio('remove', 'res/sfx/Overwrite.mp3');
        game.load.audio('incoming', 'res/sfx/BubbleBounce.mp3');
        game.load.spritesheet('foreground', 'res/gfx/foreground-tiles.png', 16, 16);*/
    },

    create: function() { 
        map = game.add.tilemap('pipecity');
        map.addTilesetImage('background-tiles', 'tiles');
        map.addTilesetImage('background2', 'tiles2');

        var layer1 = map.createLayer('Background');
        layer1.resizeWorld();

        layer1.alpha = 0.0;
        var alpha_tween2 = game.add.tween(layer1);
                        
        alpha_tween2.to({ alpha: 1.0 }, 400, Phaser.Easing.Circular.InOut).delay(0);
        alpha_tween2.start();

        game.fop_logic = new FOPLogic();

        game.flow_manager = new FlowManager();

        game.placementSound = game.add.sound('placement');
        game.removeSound = game.add.sound('remove');
        game.incomingSound = game.add.sound('incoming');

        // create initial tiles
        game.cable_queue = [];
        game.cable_generator = new CableGenerator([
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

        game.play_field = [];

        this.QUEUE_SIZE = 9;
        for(var i = 0; i < this.QUEUE_SIZE; i++) {
            var cable_logic = game.cable_generator.next();
            var frame = 0;

            if(cable_logic.entrance() == Cable.NORTH && cable_logic.exit() == Cable.SOUTH) {
                frame = 4;
            }
            else if(cable_logic.entrance() == Cable.NORTH && cable_logic.exit() == Cable.WEST) {
                frame = 15;
            }
            else if(cable_logic.entrance() == Cable.NORTH && cable_logic.exit() == Cable.EAST) {
                frame = 12;
            }
            else if(cable_logic.entrance() == Cable.SOUTH && cable_logic.exit() == Cable.EAST) {
                frame = 0;
            }
            else if(cable_logic.entrance() == Cable.SOUTH && cable_logic.exit() == Cable.WEST) {
                frame = 3;
            }
            else if(cable_logic.entrance() == Cable.WEST && cable_logic.exit() == Cable.EAST) {
                frame = 1;
            }

            var sprite = game.add.sprite(64 + 16, 0 + (i*32) + 16, 'foreground-tiles', frame);
            
            sprite.scale.x = 0.0;
            sprite.scale.y = 0.0;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;

            sprite.orig_x = sprite.x;
            sprite.orig_y = sprite.y;

            var tween = game.add.tween(sprite.scale);
            tween.to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Bounce.Out).delay(1000);
            tween.start();

            sprite.cable_logic = cable_logic;

            if(i == this.QUEUE_SIZE - 1) {
                sprite.inputEnabled = true;
                sprite.input.enableDrag(true);

                sprite.events.onDragStart.add(function(item) {
                    if(game.cable_queue[8] == item){
                        var alpha_tween = game.add.tween(item);
                        
                        alpha_tween.to({ alpha: 0.5 }, 100, Phaser.Easing.Circular.InOut).delay(100);
                        alpha_tween.start();
                    }
                });
                sprite.events.onDragStop.add(game.fop_logic.fixLocation);
            }
            game.cable_queue.push(sprite);
        }

        // add source and sink
        game.source = game.add.sprite(6 * 32, 5 * 32, 'foreground', 1);
        game.source.cable_logic = new Cable(Cable.SOUTH, Cable.EAST);
        game.sink = game.add.sprite(6 * 32 + (16 * 32), 5 * 32 + (11 * 32), 'foreground', 0);
        game.sink.cable_logic = new Cable(Cable.NORTH, Cable.WEST);

        game.source.alpha = 0;
        game.sink.alpha = 0;
        var alpha_tween3 = game.add.tween(game.source);
                        
        alpha_tween3.to({ alpha: 1.0 }, 1000, Phaser.Easing.Circular.InOut).delay(800);
        alpha_tween3.start();

        var alpha_tween4 = game.add.tween(game.sink);
                        
        alpha_tween4.to({ alpha: 1.0 }, 1000, Phaser.Easing.Circular.InOut).delay(800);
        alpha_tween4.start();

        for(var row = 0; row < 11; row++) {
            game.play_field[row] = [];
            for(var col = 0; col < 17; col++) {
                game.play_field[row][col] = null;
            }
        }
        game.play_field[0][0] = game.source;
        game.play_field[10][16] = game.sink;

        //var text = "A recent storm has disabled the power lines. Connect the hydroelectric source to the home to win.";
        //var style = { font: "21px NESFont", fill: "#ffa39960", align: "center" };

        //var t = game.add.text(32 * 6, 32, text, style);

        var sp = game.add.sprite(32*6, 32, 'textimg');
         game.onetime = false;
        this.jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpKey.onDown.add(function() {
                if(!game.onetime){
                    game.ontime = true;
            var sp2 = game.add.sprite((5*32) + (15*32/2), (32*7) + (3*32/2), 'game-won');
            var t4 = game.add.tween(sp2.scale);

            sp2.scale.x = 0;
            sp2.scale.y = 0;
            sp2.anchor.x = 0.5;
            sp2.anchor.y = 0.5;

            t4.to({ x: 1.0, y: 1.0 }, 2000, Phaser.Easing.Bounce.Out).delay(100);
            t4.start();
        }
        }, null);
        /*this.game.input.onDown.add(function() {
               if(!game.onetime){
                   game.ontime = true;
            var sp2 = game.add.sprite((5*32) + (15*32/2), (32*7) + (3*32/2), 'game-won');
            var t4 = game.add.tween(sp2.scale);

            sp2.scale.x = 0;
            sp2.scale.y = 0;
            sp2.anchor.x = 0.5;
            sp2.anchor.y = 0.5;

            t4.to({ x: 1.0, y: 1.0 }, 2000, Phaser.Easing.Bounce.Out).delay(1000);
            t4.start();
             }
        }, null);*/
    },

    processKey: function() {
        var sp2 = game.add.sprite((5*32) + (15*32/2), (32*7) + (3*32/2), 'game-won');
        var t4 = game.add.tween(sp2.scale);

        sp2.scale.x = 0;
        sp2.scale.y = 0;
        sp2.anchor.x = 0.5;
        sp2.anchor.y = 0.5;

        t4.to({ x: 1.0, y: 1.0 }, 2000, Phaser.Easing.Bounce.Out).delay(1000);
        t4.start();
    },
    
    update: function() {0

    }
};

// Add and start the 'main' state to start the game
game.state.add('main', game_state.main); 
game.state.add('title', title_screen_state.main); 
game.state.start('title'); 