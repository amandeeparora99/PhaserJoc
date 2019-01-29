class escenaMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'escenaMenu' });
        self.play = null;
    }

    preload() {
        this.load.image('play', 'assets/play.png')
        this.load.image('question', 'assets/question.png')
        this.load.image('credits', 'assets/credits.png')
    }

    create() {

        self.play = this.add.image(400,300,'play');
        self.play.setOrigin(0.5);
        self.play.setInteractive();
        play.on('pointerdown', function (event) {
            var escena = new escenaJoc();
            this.scene.add('escenaJoc',escena,true)
            this.scene.remove('escenaMenu')

        }, this)

        self.question = this.add.image(770, 30, 'question');
        self.question.setOrigin(0.5);
        self.question.setScale(0.25)
        self.question.setInteractive();
        
        question.on('pointerdown', function (event) {
            var escena = new escenaInstruccions();
            this.scene.add('escenaInstruccions',escena,true)
            this.scene.remove('escenaMenu')
        }, this)

        self.credits = this.add.image(390, 500, 'credits');
        self.credits.setScale(0.3)
        self.credits.setOrigin(0.5);
        self.credits.setInteractive();
        credits.on('pointerdown', function (event) {
            var escena = new escenaCredits();
            this.scene.add('escenaCredits',escena,true)
            this.scene.remove('escenaMenu')
        }, this)
    }
}
