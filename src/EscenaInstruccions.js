class escenaInstruccions extends Phaser.Scene {
    constructor() {
        super({ key: 'escenaInstruccions' });
    }

    preload() {
        this.load.image('dreta', 'assets/ws.png')
        this.load.image('esquerre', 'assets/fletxes.png')
        this.load.image('arrow', 'assets/arrow.png')
    }

    create() {
        self.jugador1 = this.add.image(200, 250, 'dreta')
        self.jugador2 = this.add.image(600, 250, 'esquerre')

        var inst1 = this.add.text(90, 320, 'Moviment Jugador 1')
        inst1.setScale(1.25)
        var inst2 = this.add.text(490, 320, 'Moviment Jugador 2')
        inst2.setScale(1.25)
        var inst3 = this.add.text(150, 450, 'El primer jugador en arribar a 10 punts guanya! \nTocar 3 vegades la pilota potencia el bot!')
        inst3.setScale(1.25)

        self.question = this.add.image(750, 30, 'arrow');
        self.question.setOrigin(0.5);
        self.question.setScale(0.25)
        self.question.setInteractive();
        question.on('pointerdown', function (event) {
            var escena = new escenaMenu();
            this.scene.add('escenaMenu',escena,true)
            this.scene.remove('escenaInstruccions')

        }, this)
    }
}
