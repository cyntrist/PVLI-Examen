export default class Sprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.play('sprite');
        this.setScale(1);
        this.moves = true;
        this.body.setSize(this.width, this.height);
        this.body.setOffset(0, 0);
        this.depth = 0;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

        scene.add.existing(this);
        scene.physics.world.enable(this);
    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        if (this.moves) {
            this.move();
        }
    }

    move() {
        this.setVelocityX(speed);
    }

    die() {
        this.moves = false;
        this.setVelocity(0);
    }
}