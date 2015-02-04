level_1_intro_state = {};

level_1_intro_state.main = function() { };

level_1_intro_state.main.prototype = {
    preload: function() { 
        game.load.image('intro-1', 'res/gfx/intro1.png');
    },

    create: function() { 
        var sprite = game.add.sprite(0, 0, 'intro-1');
        sprite.inputEnabled = true;
        game.title_done = false;
        sprite.x = game.width/2 - sprite.width/2;
        game.stage.backgroundColor = '#363636';

        sprite.events.onInputUp.add( function(item) {
            if(!game.title_done){

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
