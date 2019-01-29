class escenaJoc extends Phaser.Scene{
    constructor (){
        super({
                key:'escenaJoc',
                active: false,
                physics: {
                    default: 'matter',
                    matter: {
                        debug: false,
                        gravity: {
                            x: 0,
                            y: 0
                        }
                    }
                }
        });
        self.cursor = null;
        self.contador = 0;
        self.contador2 = 0;
        self.velCara = 10;
        self.lletraW = null;
        self.lletraS = null;
        self.cara;
        self.plataforma;
        self.plataforma2;
        self.imatge;
    }

preload() {

    this.load.image('cara', 'assets/cara.png')
    this.load.image('plataforma', 'assets/plataforma.png')
    this.load.image('plataformalvl1', 'assets/plataformalvl1.png')
    this.load.image('plataformalvl2', 'assets/plataformalvl2.png')
    this.load.image('plataformalvl3', 'assets/plataformalvl3.png')
    this.load.image('space', 'assets/imatgefons.png')
    this.load.image('pause', 'assets/pause.png')
    this.load.image('resume', 'assets/resume.png')

}

create() {

    //Puntuacio
    var puntuacioText = this.add.text(395, 25, '-', { fill: '#fff' })
    puntuacioText.setScale(3)

    var contadoresquerre = 8;
    var puntuacioesquerre = this.add.text(620, 50, contadoresquerre, { fill: '#fff' })
    puntuacioesquerre.setOrigin(0.5)
    puntuacioesquerre.setScale(3)

    var contadordreta = 8;
    var puntuaciodreta = this.add.text(170, 50, contadordreta, { fill: '#fff' })
    puntuaciodreta.setOrigin(0.5)
    puntuaciodreta.setScale(3)

    self.cursor = this.input.keyboard.createCursorKeys();
    self.lletraW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    self.lletraS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

    //Límits pantalla (parets invisibles)
    this.matter.world.setBounds();

    self.cara = this.matter.add.image(200,200,'cara');
    self.cara.setCircle();
    self.cara.setScale(0.25);
    self.cara.setVelocity(10);
    self.cara.setBounce(1);
    self.cara.setFriction(0);    //Friccio amb altres objectes
    self.cara.setFrictionAir(0); //Friccio amb l'aire <>
    
    var rectangle = this.matter.add.rectangle(20, 200, 130, 25, { 
        chamfer: { radius: [10, 10, 0, 0] }
    })
    var rectangle2 = this.matter.add.rectangle(780, 200, 130, 25, { 
        chamfer: { radius: [0, 0, 10, 10] }
    })
    
    self.plataforma = this.matter.add.gameObject(this.add.image(30, 300, 'plataforma'))
    self.plataforma.body.destroy();
    self.plataforma.body = rectangle;
    
    self.plataforma.body.collideWorldBounds = true;
    self.plataforma.setOrigin(0.5)
    self.plataforma.angle = 90;
    self.plataforma.body.isStatic = true;
    self.plataforma.setBounce(1);

    self.plataforma2 = this.matter.add.gameObject(this.add.image(770, 300, 'plataforma'))
    self.plataforma2.body.destroy();
    self.plataforma2.body = rectangle2;

    self.plataforma2.body.collideWorldBounds = true;
    self.plataforma2.setOrigin(0.5);
    self.plataforma2.angle = 90;
    self.plataforma2.body.isStatic = true;
    self.plataforma2.setBounce(1);

    this.matter.world.on('collisionstart',function(event,bodyA,bodyB){
        if(bodyA.gameObject === null && bodyB.gameObject.x > 780){
            contadordreta++
            puntuaciodreta.setText(contadordreta)
            this.cameras.main.shake(100);
            contador = 0;
            velCara = 10;
            

            if(contadordreta == 10){
                var dreta = new escenaGuanyadorDreta();
                this.scene.add('escenaGuanyadorDreta', dreta, true)
                this.scene.remove('escenaJoc')
            }

        } else if(bodyA.gameObject === null && bodyB.gameObject.x < 20){
            contadoresquerre++
            puntuacioesquerre.setText(contadoresquerre)
            this.cameras.main.shake(100);
            contador2 = 0;
            velCara = 10;
            
            if(contadoresquerre == 10){
                var esquerre = new escenaGuanyadorEsquerre();
                this.scene.add('escenaGuanyadorEsquerre', esquerre, true)
                this.scene.remove('escenaJoc')
            }
        }
    },this);

    this.matter.world.on('collisionstart',function(event,bodyA,bodyB){
        if(bodyA === plataforma2.body || bodyB === plataforma2.body){
            console.log(contador2)
            contador2++;
            if(contador == 0){
                velCara = 10;
            }
            
            if(contador2 == 3){
                contador2 = 0;
                velCara = 20;
            }
        }
        if(bodyA === plataforma.body || bodyB === plataforma.body){
            console.log(contador)
            contador++;
            if(contador2 == 0){
                velCara = 10;
            }
            
            if(contador == 3){
                contador = 0;
                velCara = 20;
            }
        }
    },this);

}


shake() {
    this.cameras.main.shake(0.01, 100);
}

update(time, delta) {

    var velPlataforma = 1000;

    //MOVIMENT JUGADOR 1

    if (self.cursor.up.isDown) {
        if (self.plataforma2.y > 70) {
            self.plataforma2.y = self.plataforma2.y - velPlataforma * delta / 1000.0
        }
    }
    else if (self.cursor.down.isDown) {
        if (self.plataforma2.y < 530) {
            self.plataforma2.y = self.plataforma2.y + velPlataforma * delta / 1000.0
        }
    }
    if (self.lletraW.isDown) {
        if (self.plataforma.y > 70) {
            self.plataforma.y = self.plataforma.y - velPlataforma * delta / 1000.0
        }
    } else if (self.lletraS.isDown) {
        if (self.plataforma.y < 530) {
            self.plataforma.y = self.plataforma.y + velPlataforma * delta / 1000.0
        }
    }

    //COLISIO

    var v = new Phaser.Math.Vector2(cara.body.velocity);

    //Velocitat

    if (v.x >= 0 && v.x < 5) {
        v.x = 100;
    } else if (v.x < 0 && v.x > -5) {
        v.x = -100;
    }
    if (v.x === 0 && v.y === 0) {
        cara.setVelocity(velCara, 0);
    }
    else {
        var nova_velocitat = v.normalize();
        nova_velocitat.scale(velCara);
        cara.setVelocity(nova_velocitat.x, nova_velocitat.y);
    }
}
}