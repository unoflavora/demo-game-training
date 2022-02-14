var stateBoot = function (game) { }

stateBoot.prototype = {
    create: function () {
        // Adjust the screen size to full view or stretch
        if (this.game.device.desktop) {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setGameSize(defaultWidth, defaultHeight * desktopMobileRatio);
        } else {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.parentIsWindow = false;

        }

        // Load custom font cache
        this.cacheFont = this.game.add.text(0, 0, "", { font: 'dbxlnn', fill: '#fff', fontSize: 24 });

        // Refresh the screen scaling
        this.game.scale.setScreenSize = true;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();

        // Call the Preload state
        this.game.state.start('preload');
    }
}
