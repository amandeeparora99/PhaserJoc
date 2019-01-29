class escenaCredits extends Phaser.Scene {
    constructor() {
        super({ key: 'escenaCredits' });
        self.play = null;
    }

    preload() {
        this.load.image('arrow', 'assets/arrow.png')
    }

    create() {
        var byAman = this.add.text(300, 300, 'Fet per Aman Arora')
        byAman.setScale(1.25)

        self.question = this.add.image(750, 30, 'arrow');
        self.question.setOrigin(0.5);
        self.question.setScale(0.25)
        self.question.setInteractive();
        question.on('pointerdown', function (event) {
            var escena = new escenaMenu();
            this.scene.add('escenaMenu',escena,true)
            this.scene.remove('escenaCredits')

        }, this)
    }
}