import Player from "./player.js";
import Sprite from "./sprite.js";
import Container from "./container.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });
    }

    init(data) {
        this.data = data;
    }

    preload() {
        this.canvas = this.sys.game.canvas;
    }

    create() {
        const { width, height } = this.canvas; // la anchura y altura del canvas
        this.width = width;
        this.height = height;
        const scene = this;

        // audio
        this.sound.stopAll();
        this.sound.add('key', { loop: true }).play();
        this.soundEffect = this.sound.add('key');

        // player
        this.player = new Player(this, 0, 0);
        this.physics.add.collider(this.player, object, callback, null, this);

        // bg 
        let background = this.add.image(0, 200, 'background').setScale(1).setOrigin(0, 0);






        this.scoreInterval = setInterval(() => {
            
        }, 1000);      
        
        this.time.delayedCall(5000, metodo(), [], this);

        this.pool = this.physics.add.group({
            classType: Element,
            maxSize: 100, 
            runChildUpdate: true, 
        });
    }

    preUpdate(time, deltaTime) {

    }

    update() {
        
    }

    onDie() {

    }

    onWin() {

    }

    endGame() {
        setTimeout(() => {
            this.scene.start('Menu');
        }, 4000);
    }

    
    disableInput()  {
        clearInterval(this.interval);
        this.player1.input = false;
    }
}