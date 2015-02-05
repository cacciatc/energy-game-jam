game_over_state = {};

game_over_state.main = function() { };

game_over_state.main.prototype = {
    preload: function() { 
        //game.load.image('gamewon', 'res/gfx/gamewon.png');
    },

    create: function() { 
        //var sprite = game.add.sprite(0, 0, 'gamewon');
        //sprite.inputEnabled = true;
        //game.title_done = false;
        //sprite.x = game.width/2 - sprite.width/2;
        //game.stage.backgroundColor = '#363636';

        var style = { font: "55px Courier", fill: "#f4e5a0", align: "center" };
        var text = "Thanks for playing!\n\nMade by Adam & Chris (@cacciatc)"
        var t = game.add.text(game.world.centerX-530, 175, text, style);
    },

    update: function() {

    }
};
