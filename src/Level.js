import Player from "./player.js";
import Ball from "./ball.js";
import Enemy from "./enemy.js"

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });
    }

    init(data) {
        this.data = data.data;
        console.log(this.data);
    }

    preload() {
        this.canvas = this.sys.game.canvas;
        this.eventEmitter = new Phaser.Events.EventEmitter();
    }

    create() {
        const { width, height } = this.canvas; // la anchura y altura del canvas
        this.width = width;
        this.height = height;
        const scene = this;

        // audio
        this.sound.stopAll();
        //this.sound.add('key', { loop: true }).play();
        this.collideSfx = this.sound.add('collideSfx');
        this.winSfx = this.sound.add('winSfx');
        this.loseSfx = this.sound.add('loseSfx');

        // bg 
        this.add.image(0, 0, 'background').setScale(1).setOrigin(0, 0);
        this.add.image(115, 168, 'table').setOrigin(0, 0);
        this.add.image(this.width - 140, this.height - 230, 'score').setOrigin(0, 0);

        // balones
        let espacio = 351 - 115;
        this.upside = 0; // balones en la parte de arriba
        this.downside = 0; // balones en la parte de abajo
        this.balls = [];
        for (let i = 0; i < 5; i++) {
            let ball = new Ball(this, 115 + espacio * (i + 1) / 6, 168, 0);
            this.balls.push(ball);
            this.upside++;
        }
        for (let i = 0; i < 5; i++) {
            let ball = new Ball(this, 115 + espacio * (i + 1) / 6, 460, 0)
            this.balls.push(ball);
            this.downside++;
        }
        this.physics.add.collider(this.balls, this.balls, (b1, b2) => {
            this.collideSfx.play();
        }, null, this);





        // zonas de juego
        this.upsideCollider = this.add.sprite(230, 160, 'none').setVisible(false);
        this.downsideCollider = this.add.sprite(230, 470, 'none').setVisible(false);
        this.physics.world.enable(this.upsideCollider);
        this.physics.world.enable(this.downsideCollider);
        this.upsideCollider.body.setSize(espacio, 50);
        this.downsideCollider.body.setSize(espacio, 50);
        this.upsideCollider.body.setImmovable(true);
        this.downsideCollider.body.setImmovable(true);




        // player
        this.player = new Player(this, 156, 424 + 20, 1);
        if (this.data === 2) {
            this.player2 = new Player(this, 156, 172, 2);
        }
        else {
            this.enemy = new Enemy(this, 156, 172);
        }








        // contador
        this.counter = 90;
        this.counterText = scene.add.text(width / 2, 50, this.counter, {
            fontFamily: 'babelgam',
            fontSize: 32,
        }).setOrigin(0.5, 0.5).setScrollFactor(0);
        this.counterInterval = setInterval(() => {
            this.counter--;
        }, 1000);







        // eventos
        this.eventEmitter.on('win', function () {
            this.add.text(width / 2, height / 2, "YOU WIN\n" + this.downside + " / " + this.upside, {
                fontFamily: 'babelgam',
                fontSize: 48,
                align: 'center',
                color: 'blue'
            }).setOrigin(0.5, 0.5).setStroke('white', 2);
            this.winSfx.play();
            this.endGame();
        }, this)

        this.eventEmitter.on('lose', function () {
            this.add.text(width / 2, height / 2, "YOU LOST\n" + this.downside + " / " + this.upside, {
                fontFamily: 'babelgam',
                fontSize: 48,
                align: 'center',
                color: 'blue'
            }).setOrigin(0.5, 0.5).setStroke('white', 2);
            this.loseSfx.play();
            this.endGame();
        }, this)

        this.eventEmitter.on('draw', function () {
            this.add.text(width / 2, height / 2, "DRAW\n" + this.downside + " / " + this.upside, {
                fontFamily: 'babelgam',
                fontSize: 48,
                align: 'center',
                color: 'blue'
            }).setOrigin(0.5, 0.5).setStroke('white', 2);
            this.endGame();
        }, this)

        // this.scoreInterval = setInterval(() => {

        // }, 1000);      

        // this.time.delayedCall(5000, metodo(), [], this);

        // this.pool = this.physics.add.group({
        //     classType: Element,
        //     maxSize: 100, 
        //     runChildUpdate: true, 
        // });
    }

    preUpdate(time, deltaTime) {

    }

    update() {
        this.player1canTake = this.physics.overlap(this.balls, this.player, (ball, player) => {
            if (player.cursors.interact.isDown) {
                ball.destroy();
                player.ball = true;
            }
        }, null, this);
        if (this.player2 !== undefined) {
            this.player2canTake = this.physics.overlap(this.balls, this.player2, (ball, player) => {
                if (player.ball) {
                    ball.destroy();
                }
            }, null, this);
        }

        
        this.upside = this.checkNumber(this.upsideCollider);
        this.downside = this.checkNumber(this.downsideCollider);
        


        this.counterText.setText(this.counter);
        if (this.downside >= 10) {
            this.eventEmitter.emit('win');
        }
        else if (this.upside >= 10) {
            this.eventEmitter.emit('lose');
        }

        if (this.counter <= 0) {
            if (this.downside > this.upside) {
                this.eventEmitter.emit('win');
            }
            else if (this.downside < this.upside) {
                this.eventEmitter.emit('lose');
            }
            else {
                this.eventEmitter.emit('draw');
            }
        }
    }

    endGame() {
        this.disableInput();
        setTimeout(() => {
            this.scene.start('Menu');
        }, 4000);
    }


    disableInput() {
        clearInterval(this.counterInterval);
        this.player.input = false;
        if (this.player2 !== undefined) {
            this.player2.input = false;
        }
    }

    checkNumber(collider) {
        let i = 0;
        this.balls.forEach(ball => {
            if (Phaser.Geom.Intersects.CircleToRectangle(ball.getBounds(), collider.getBounds()))
                i++;
        });
        return i;
    }
}