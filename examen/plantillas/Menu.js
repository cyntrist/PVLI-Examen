export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    init(data) {

    }
    
    preload() {
        this.canvas = this.sys.game.canvas;
    }

    create() {
        const { width, height } = this.canvas; // la anchura y altura del canvas
        const scene = this;

        // musica
        this.sound.stopAll();
        this.sound.add('menuMusic', { loop: true }).play();
        
        // fondo estrellas
        this.add.image(width/2, height/2, 'background').setScale(3).setOrigin(0.5, 0.5);
        // titulo
        this.add.text(width/2, height/2, "TITLE", {
            fontFamily: 'arcade_classic',
            fontSize: 48,
        }).setOrigin(0.5, 0.5);
        
        // botones dificultad
        let button = this.add.text(width/2, height/2 + 50, "BUTTON", {
            fontFamily: 'font_key',
            fontSize: 24,
        }).setOrigin(0.5, 0.5).setInteractive();

        button.on('pointerdown', () => {
            scene.scene.start('Level', { data: 0 });
        });
    }
}