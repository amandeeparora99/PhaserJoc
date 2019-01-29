class escenaGuanyadorEsquerre extends Phaser.Scene {
    constructor() {
        super({ key: 'escenaGuanyadorEsquerre' });
    }

    preload() {
        this.load.image('restart', 'assets/restart.png')
        this.load.image('back', 'assets/arrow.png')
    }

    create() {
        var GuanyaEsquerre = this.add.text(100, 200, 'GUANYADOR: JUGADOR 2');
        GuanyaEsquerre.setScale(3)

        self.question = this.add.image(390, 360, 'restart');
        self.question.setOrigin(0.5);
        self.question.setScale(0.60)
        self.question.setInteractive();
        question.on('pointerdown', function (event) {
            var escena = new escenaJoc();
            this.scene.add('escenaJoc',escena,true)
            this.scene.remove('escenaGuanyadorEsquerre')

        }, this)

        self.credits = this.add.image(395, 500, 'back');
        self.credits.setScale(0.75)
        self.credits.setOrigin(0.5);
        self.credits.setInteractive();
        credits.on('pointerdown', function (event) {
            var escena = new escenaMenu();
            this.scene.add('escenaMenu',escena,true)
            this.scene.remove('escenaGuanyadorEsquerre')
        }, this)
    }
}