const speed = 100;

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, { key: 'player' });
        this.play('playerIdle');
        this.input = true;
        this.setScale(1);
        this.depth = 1;
        this.jumpSound = scene.sound.add('jumpEffect');
        this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            interact: Phaser.Input.Keyboard.KeyCodes.E,
            escape: Phaser.Input.Keyboard.KeyCodes.ESC
        });
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        this.move();
    }

    move() {
        if (this.input) {
            this.setVelocity(0);

            if (this.cursors.left.isDown && (this.x - this.width / 2) > 0) {
                this.setVelocityX(-speed);
                this.animate(this.leftAnim);
            }
            if (this.cursors.right.isDown && (this.x + this.width / 2) < this.scene.width) {
                this.setVelocityX(speed);
                this.animate(this.rightAnim);
            }
            if (this.cursors.up.isDown && (this.y - this.height / 2) > 0) {
                this.setVelocityY(-speed);
            }
            if (this.cursors.down.isDown && (this.y + this.height / 2) < this.scene.height) {
                this.setVelocityY(speed);
            }

            if (this.body.velocity.x === 0) {
                this.animate(this.idleAnim);
            }
        }
        else {
            this.setVelocity(0);
            this.body.setAllowGravity(false);
            this.body.setImmovable(true);
        }
    }

    animate(anim) {
        if (this.anims.currentAnim.key !== anim) {
            this.anims.play(anim);
        }
    }

    win() {

    }

    die() {

    }
}