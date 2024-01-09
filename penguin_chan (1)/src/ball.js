const speed = 200;

export default class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, 'ball');
        this.setScale(1);
        this.moves = true;
        this.direction = direction;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(false);
        this.setBounce(1, 1);
        this.setCircle(8);
    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        if (this.direction !== 0) {
            this.move();
        }
        if (this.y > 460 || this.y < 168) {
            if (this.y > 460) {
                this.y = 460;
            }
            else {
                this.y = 168;
            }
            this.direction = 0;
            this.setVelocity(0);
        }

        let espacio = 351 - 115;
        if (this.x < 115) {
            this.x = 115;
            this.setVelocity(0);
            this.direction = 0;
        }
        else if (this.x > 351) {
            this.x = 351;
            this.setVelocity(0);
            this.direction = 0;
        }
    }

    move() {
        this.setVelocityY(speed * this.direction);

    }

    die() {
        this.moves = false;
        this.setVelocity(0);
    }
}