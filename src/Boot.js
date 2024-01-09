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
        this.load.image('background', '../assets/background.png');
        this.load.image('ball', '../assets/ball16.png');
        this.load.image('table', '../assets/table.png');
        this.load.image('score', '../assets/score.png');

        //spritesheets
        this.load.spritesheet('rat', '../assets/rat32.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('penguin', '../assets/penguin40.png', { frameWidth: 40, frameHeight: 40 });

        // Loading audio
        this.load.audio('collideSfx', '../assets/sounds/collide.mp3');
        this.load.audio('loseSfx', '../assets/sounds/lose.mp3');
        this.load.audio('stunSfx', '../assets/sounds/stun.mp3');
        this.load.audio('throwSfx', '../assets/sounds/throw_ball.mp3');
        this.load.audio('winSfx', '../assets/sounds/win.mp3');
    }

    createAnimations() {
        this.anims.create({
            key: 'ratIdle',
            frames: this.anims.generateFrameNumbers('rat', {start:5, end:5}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'ratIdleBall',
            frames: this.anims.generateFrameNumbers('rat', {start:0, end:0}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'ratMove',
            frames: this.anims.generateFrameNumbers('rat', {start:3, end:4}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'ratMoveBall',
            frames: this.anims.generateFrameNumbers('rat', {start:1, end:2}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'ratStun',
            frames: this.anims.generateFrameNumbers('rat', {start:8, end:10}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'ratWin',
            frames: this.anims.generateFrameNumbers('rat', {start:6, end:6}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'ratLoose',
            frames: this.anims.generateFrameNumbers('rat', {start:11, end:12}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'penguinIdle',
            frames: this.anims.generateFrameNumbers('penguin', {start:0, end:0}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'penguinIdleBall',
            frames: this.anims.generateFrameNumbers('penguin', {start:5, end:5}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'penguinMove',
            frames: this.anims.generateFrameNumbers('penguin', {start:1, end:2}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'penguinMoveBall',
            frames: this.anims.generateFrameNumbers('penguin', {start:6, end:7}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'penguinStun',
            frames: this.anims.generateFrameNumbers('penguin', {start:9, end:10}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'penguinWin',
            frames: this.anims.generateFrameNumbers('penguin', {start:11, end:12}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'penguinLoose',
            frames: this.anims.generateFrameNumbers('penguin', {start:8, end:8}),
            frameRate: 5,
            repeat: -1
        });
    }

    create() {
        this.createAnimations();
        this.scene.start('Menu');
    }
}