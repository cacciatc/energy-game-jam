// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(768, 640, Phaser.AUTO, 'game_div');
var game_state = {};

// Creates a new 'main' state that wil contain the game
game_state.main = function() { };  

game_state.main.prototype = {

    preload: function() { },

    create: function() {
        /* create tilesets */
        map = game.add.tilemap('pipecity');

        map.addTilesetImage('background-tiles', 'tiles');
        map.addTilesetImage('background2', 'tiles2');

        /* create layer */
        var layer1 = map.createLayer('Background Layer');
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
        game.play_field = new Playfield(7, 8);

        this.QUEUE_SIZE = 9;
        for(var i = 0; i < this.QUEUE_SIZE; i++) {
            var cable_logic = game.cable_generator.next();
            
            var sprite = CableSprite.create(cable_logic, 64 + CableSprite.width/2, 0 + (i * CableSprite.height) + CableSprite.height/2);

            UtilityTweens.cableToNormalSize(sprite);

            sprite.onCallback = function (sprite, neighbor) {
                if(neighbor.energy_type == "geo") {
                    sprite.frame = sprite.orig_frame + 6;
                }
                else if(neighbor.energy_type == "wind") {
                    sprite.frame = sprite.orig_frame + 12;
                }
                else if(neighbor.energy_type == "solar") {
                    sprite.frame = sprite.orig_frame + 18;
                }
                else {
                    sprite.frame = sprite.orig_frame;
                }
            };
            game.cable_queue.push(sprite);
        }

        InputConfig.setupTouch(game.cable_queue[game.cable_queue.length - 1]);

        // add source and sink
        game.source = game.add.sprite(4 * CableSprite.width, 1 * CableSprite.height, 'abstract-foreground', 0);
        game.source.animations.add('on', [0+5, 1+5, 2+5, 3+5, 4+5], 5, true);
        game.source.play('on');
        game.source.energy_type = "wind";

        game.source.cable_logic = new Cable(Cable.SOUTH, Cable.EAST);

        game.sink = game.add.sprite(10 * CableSprite.width, 8 * CableSprite.height, 
            'abstract-foreground', 39);

        game.sink.cable_logic = new Cable(Cable.NORTH, Cable.WEST);

        game.source.alpha = 0;
        game.sink.alpha = 0;
        
        UtilityTweens.fadeInCable(game.source);
        UtilityTweens.fadeInCable(game.sink);

        game.play_field.set(0, 0, game.source);
        game.play_field.set(6, 7, game.sink);
    },

    update: function() { }
};

// Add and start the 'main' state to start the game
game.state.add('main', game_state.main); 
game.state.add('title', title_screen_state.main); 
game.state.start('title');