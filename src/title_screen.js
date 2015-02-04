title_screen_state = {};

title_screen_state.main = function() { };

title_screen_state.main.prototype = {
    preload: function() { 
        /* tilemaps */
        game.load.tilemap('pipecity', 'res/levels/bigger-level.json', null, Phaser.Tilemap.TILED_JSON);

       	/* imgs */
        game.load.image('tiles', 'res/gfx/background-tiles.png');
        game.load.image('game-won', 'res/gfx/game-win.png');
        game.load.image('tiles2', 'res/gfx/background2.png');
        game.load.image('textimg', 'res/gfx/text.png');
        game.load.image('title', 'res/gfx/game-title.png');

        /* sfx */
        game.load.audio('placement', 'res/sfx/Placement.mp3');
        game.load.audio('remove', 'res/sfx/Overwrite.mp3');
        game.load.audio('incoming', 'res/sfx/BubbleBounce.mp3');

        /* spritesheets */
        game.load.spritesheet('foreground', 'res/gfx/foreground-tiles.png', CableSprite.width, CableSprite.height);
        game.load.spritesheet('foreground-tiles', 'res/gfx/powerlinesAlt.png', CableSprite.width, CableSprite.height);
        game.load.spritesheet('abstract-foreground', 'res/gfx/abstract-foreground.png', CableSprite.width, CableSprite.height);
    },

    create: function() { 
        var sprite = game.add.sprite(0, 0, 'title');
        sprite.inputEnabled = true;
        game.title_done = false;
        sprite.x = game.width/2 - sprite.width/2;
        game.stage.backgroundColor = '#3f89b2';

        game.state.add("intro1", level_1_intro_state.main);
        game.state.add("game", game.main);

        sprite.events.onInputUp.add( function(item) {
            if(!game.title_done){

                game.title_tween = game.add.tween(sprite);
                game.title_tween.to({ alpha: 0.0 }, 1000, Phaser.Easing.Cubic.In).delay(0);
                game.title_tween.start();

                game.title_tween.onComplete.add(function () {
                    if(game.title_done){
                        game.state.start('intro1'); 
                    }
                });

                game.title_done = true;
             }
        });
    },

    update: function() {

    }
};
