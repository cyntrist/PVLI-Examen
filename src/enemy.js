const speed = 200;

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, number) {
        super(scene, x, y, { key: 'player' });
        this.number = number;

        this.play('ratIdle');
        this.idleAnim = 'ratIdle';
        this.idleBallAnim = 'ratIdleBall';
        this.moveAnim = 'ratMove';
        this.moveBallAnim = 'ratMoveBall';
        this.stunAnim = 'ratStun';
        this.winAnim = 'ratWin';
        this.loseAnim = 'ratLose';
        this.ball = false;
        this.input = true;
        this.setScale(1);
        this.depth = 1;



        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.setSize(32, 32);

    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        //this.move();
    }

    move() {
        if (this.input) {
            this.setVelocity(0);

            if (this.cursors.left.isDown && (this.x - this.width / 2) > 115) {
                this.setVelocityX(-speed);
                if (this.ball) {
                    this.animate(this.moveAnim);
                }
                else {
                    this.animate(this.moveBallAnim);
                }
            }
            if (this.cursors.right.isDown && (this.x + this.width / 2) < 351) {
                this.setVelocityX(speed);
                if (this.ball) {
                    this.animate(this.moveAnim);
                }
                else {
                    this.animate(this.moveBallAnim);
                }
            }

            if (this.body.velocity.x === 0) {
                if (this.ball) {
                    this.animate(this.idleAnim);
                }
                else {
                    this.animate(this.idleBallAnim);
                }
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