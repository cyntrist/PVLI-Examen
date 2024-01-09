export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot' });
    }

    preload() {
        this.canvas = this.sys.game.canvas;
        const { width, height } = this.canvas; // la anchura y altura del canvas

        // #region PRELOADER que viene calentito de casaaaaa siiiiiiii
        // segmento sacado de:
        // https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/
        // gracias a toni <3
        //progressbar
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        let bar_width = width / 2;
        let bar_height = 70;
        let bar_x = (width - bar_width) / 2;
        let bar_y = (height - bar_height) / 2;
        let size_diff = 10;
        progressBox.fillStyle(0xFF799A, 0.8);
        progressBox.fillRect(bar_x, bar_y, bar_width, bar_height);

        //loading text
        let loadingText = this.make.text({
            x: width / 2,
            y: bar_y + 150,
            text: 'Loading...',
            style: {
                font: '24px monospace',
                fill: '#FFFFFF'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        // percent text
        let percentText = this.make.text({
            x: width / 2,
            y: bar_y + 200,
            text: '0%',
            style: {
                font: 'bold 24px monospace',
                fill: '#FF799A'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // asset text
        let assetText = this.make.text({
            x: width / 2,
            y: height - 60,
            text: 'Asset:',
            style: {
                font: '18px monospace',
                fill: '#FFFFFF'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        // #endregion
        
        // Loading images
        this.load.image('key', '../assets/sprites/key.png');

        //spritesheets
        this.load.spritesheet('key', '../assets/sprites/key.png', { frameWidth: 16, frameHeight: 16 });

        // Loading audio
        this.load.audio('key', '../assets/sounds/key.format');
    }

    createAnimations() {
        this.anims.create({
            key: 'key',
            frames: this.anims.generateFrameNumbers('key', {start:0, end:0}),
            frameRate: 5,
            repeat: -1
        });
    }

    create() {
        this.createAnimations();
        this.scene.start('Menu');
    }
}