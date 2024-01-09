export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    init(data) {

    }
    
    preload() {
        this.canvas = this.sys.game.canvas;
        this.eventEmitter = new Phaser.Events.EventEmitter();
    }

    create() {
        const { width, height } = this.canvas; // la anchura y altura del canvas
        const scene = this;

        // musica
        this.sound.stopAll();
        
        // titulo
        this.add.text(width/2, 150, "Penguin-chan\nWars", {
            fontFamily: 'babelgam',
            fontSize: 48,
            align: 'center',
            color: 'blue'
        }).setOrigin(0.5, 0.5).setStroke('white', 2);
        
        // botones dificultad
        this.oneplayerbutton = this.add.text(width/2, height/2 + 50, "1P. Game", {
            fontFamily: 'babelgam',
            fontSize: 24,
        }).setOrigin(0.5, 0.5).setInteractive();
        this.vsgamebutton = this.add.text(width/2, height/2 + 100, "VS. Game", {
            fontFamily: 'babelgam',
            fontSize: 24,
        }).setOrigin(0.5, 0.5).setInteractive();

        this.oneplayerbutton.on('pointerdown', () => {
            scene.scene.start('Level', { data: 1 });
        });
        this.vsgamebutton.on('pointerdown', () => {
            scene.scene.start('Level', { data: 2 });
        });

        this.eventEmitter.on('select', function() {
            scene.scene.start('Level', { data: this.value + 1 });
        }, this);

        this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            select: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });

        this.value = 0;
        this.ball = this.add.image(this.oneplayerbutton.x - this.oneplayerbutton.width/2 - 20, this.oneplayerbutton.y, 'ball');
    }

    update() {
        if (this.cursors.up.isDown) {
            this.value = 0;
            this.ball.y = this.oneplayerbutton.y;
        }
        if (this.cursors.down.isDown) {
            this.value = 1;
            this.ball.y = this.vsgamebutton.y;
        }

        if (this.cursors.select.isDown) {
            this.eventEmitter.emit('select')
        }
    }
}