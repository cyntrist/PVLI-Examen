import Ball from "./ball.js";

const speed = 200;
const cooldown = 500;

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, number) {
        super(scene, x, y, { key: 'player' });
        this.number = number;
        this.ball = false;
        this.throwSfx = scene.sound.add('throwSfx');
        this.lastShot = 0;
        this.visibleBall = this.scene.add.image( this.x + 12, this.y - 5, 'ball');

        if (this.number === 1) {
            this.idleAnim = 'penguinIdle';
            this.idleBallAnim = 'penguinIdleBall';
            this.moveAnim = 'penguinMove';
            this.moveBallAnim = 'penguinMoveBall';
            this.stunAnim = 'penguinStun';
            this.winAnim = 'penguinWin';
            this.loseAnim = 'penguinLose';
            this.cursors = scene.input.keyboard.addKeys({
                right: Phaser.Input.Keyboard.KeyCodes.D,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                interact: Phaser.Input.Keyboard.KeyCodes.SPACE,
                escape: Phaser.Input.Keyboard.KeyCodes.ESC
            });
            this.ballDir = -1;
            if (this.ball) {
                this.play('penguinIdleBall');
            }
            else {
                this.play('penguinIdle')
            }
        } else {
            this.idleAnim = 'ratIdle';
            this.idleBallAnim = 'ratIdleBall';
            this.moveAnim = 'ratMove';
            this.moveBallAnim = 'ratMoveBall';
            this.stunAnim = 'ratStun';
            this.winAnim = 'ratWin';
            this.loseAnim = 'ratLose';
            this.cursors = scene.input.keyboard.addKeys({
                right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                interact: Phaser.Input.Keyboard.KeyCodes.DOWN,
                escape: Phaser.Input.Keyboard.KeyCodes.ESC
            });
            this.ballDir = 1;
            if (this.ball) {
                this.play('penguinIdleBall');
            }
            else {
                this.play('penguinIdle')
            }
        }

        this.input = true;
        this.setScale(1);
        this.depth = 1;


        this.cursors.interact.on('up', () => {
            if (this.ball) {
                // la lanza
                this.scene.balls.push(new Ball(this.scene, this.x, this.y + (10 * this.ballDir), this.ballDir));
                this.ball = false;
                this.play(this.idleAnim);
                this.throwSfx.play();
                this.visibleBall.setVisible(false);
            } 
            else { // la coge
                if (this.number === 1 && this.scene.player1canTake) {
                    this.ball = true;
                    this.visibleBall.setVisible(true);
                    this.play(this.idleBallAnim);
                }
                else if (this.scene.player2canTake) {
                    this.ball = true;
                    this.visibleBall.setVisible(true);
                    this.play(this.idleBallAnim);
                }
            }
        });

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.setSize(32, 32);
    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        this.move();
        if (this.ball) {
            this.visibleBall.x = this.x + 12;
            this.visibleBall.y = this.y - 5;
        }
    }

    move() {
        if (this.input) {
            this.setVelocity(0);

            // movimiento
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



            // recoger bola
            if (this.cursors.interact.isDown) {
                // if (this.ball) {
                //     // la lanza
                //     this.scene.balls.push(new Ball(this.scene, this.x, this.y, this.ballDir));
                //     this.ball = false;
                //     this.play(this.idleAnim);
                //     this.throwSfx.play();
                //     this.lastShot = time;
                //     this.visibleBall.setVisible(false);
                // } 
                // else { // la coge
                //     if (this.number === 1 && this.scene.player1canTake) {
                //         this.ball = true;
                //         this.visibleBall.setVisible(true);
                //         this.play(this.idleBallAnim);
                //     }
                //     else if (this.scene.player2canTake) {
                //         this.ball = true;
                //         this.visibleBall.setVisible(true);
                //         this.play(this.idleBallAnim);
                //     }
                // }
            }



            //idle
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
        this.animate(this.winAnim);
    }

    lose() {
        this.animate(this.loseAnim);
    }
}