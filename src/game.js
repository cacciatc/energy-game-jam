// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game_div');
var game_state = {};

// Creates a new 'main' state that wil contain the game
game_state.main = function() { };  
game_state.main.prototype = {

    preload: function() { 
    },

    create: function() {
        /* create tilesets */
        map = game.add.tilemap('pipecity');
        map.addTilesetImage('background-tiles', 'tiles');
        map.addTilesetImage('background2', 'tiles2');

        /* create layer */
        var layer1 = map.createLayer('Background');
        layer1.resizeWorld();

        layer1.alpha = 0.0;
        UtilityTweens.fadeInLayer(layer1);

        /* handles field of play logic */
        game.fop_logic = new FOPLogic();

        /* detects connectivity */
        game.flow_manager = new FlowManager();

        /* create sfx */
        game.placementSound = game.add.sound('placement');
        game.removeSound = game.add.sound('remove');
        game.incomingSound = game.add.sound('incoming');

        /* create initial tiles */
        game.cable_queue = [];
        game.cable_generator = LevelLoader.load(LevelLoader.LEVEL1);
        
        /* playfield is a mapped collection */
        game.play_field = new Playfield(17, 12);

        this.QUEUE_SIZE = 9;
        for(var i = 0; i < this.QUEUE_SIZE; i++) {
            var cable_logic = game.cable_generator.next();
            
            var sprite = CableSprite.create(cable_logic, 64 + 16, 0 + (i * CableSprite.height) + 16);

            UtilityTweens.cableToNormalSize(sprite);

            sprite.onCallback = function (sprite) {
                /*sprite.alph = game.add.tween(sprite);
                                
                sprite.alph.to({ alpha: 0.5 }, 500, Phaser.Easing.Circular.InOut);
                sprite.alph.start();

                sprite.alph.onComplete.add(function (item) {
                    sprite.alph2 = game.add.tween(item);
                    sprite.alph2.to({ alpha: 1.0 }, 500, Phaser.Easing.Circular.InOut);
                    sprite.alph2.onComplete.add(function (item) {
                        item.alph.start();
                    });
                    sprite.alph2.start();
                });*/
            };

            InputConfig.setupTouch(sprite);
            game.cable_queue.push(sprite);
        }

        // add source and sink
        game.source = game.add.sprite(6 * CableSprite.width, 5 * CableSprite.height, 'foreground', 1);
        game.source.cable_logic = new Cable(Cable.SOUTH, Cable.EAST);

        game.sink = game.add.sprite(6 * CableSprite.width + (16 * CableSprite.width), 5 * CableSprite.height + (11 * CableSprite.height), 
            'foreground', 0);

        game.sink.cable_logic = new Cable(Cable.NORTH, Cable.WEST);

        game.source.alpha = 0;
        game.sink.alpha = 0;
        
        UtilityTweens.fadeInCable(game.source);
        UtilityTweens.fadeInCable(game.sink);

        game.play_field.set(0, 0, game.source);
        game.play_field.set(16, 11, game.sink);
    },

    update: function() {

    }
};

// Add and start the 'main' state to start the game
game.state.add('main', game_state.main); 
game.state.add('title', title_screen_state.main); 
game.state.start('title');