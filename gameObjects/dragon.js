import segment from '../modules/bodyPart.js'
import limb from '../modules/limb.js'
import {controls} from "../Helpers/keyHandler.js";

export default class Dragon {

    constructor(nodesNumber) {
        this.nodesNumber = nodesNumber;
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.nodes = [];
        this.branches = [];
        this.currentSpeed = 0;
        this.speed = 1000;
        this.deceleration = 600;
        this.head = null;
        this.fireCooldown = 0;
    }

    create() {

        for (let i = 0; i < this.nodesNumber; i++) {
            let bodyPart = new segment(
                i ? 75 : 100,
                i ? this.nodes[i - 1].bx : this.x,
                i ? this.nodes[i - 1].by : this.y,
                i * .2 + 1,
                i ? this.nodes[i - 1] : null
            );
            this.nodes.push(bodyPart);
            !i ? bodyPart.dragon = this : null;
            bodyPart.create();

            if (i === 5 || i === 2) {
                let appendage = new limb(50, this.nodes[i], .5, 'left');
                this.branches.push(appendage)
                appendage.create();
                let appendage2 = new limb(50, this.nodes[i], .5, 'right');
                this.branches.push(appendage2)
                appendage2.create();
            }
        }
        //render the sprites for the dragon
        for (let i=this.nodes.length-1; i>=0; i--) {
            let bodyPart = this.nodes[i];
            if (i) {
                if (i === this.nodesNumber - 1) {
                    bodyPart.skin('../assets/textures/Dragon Tail.png');
                    bodyPart.sprite.height = 150;
                } else {
                    bodyPart.skin();
                }
            } else {
                bodyPart.skin('../assets/textures/Dragon Head WIP.png')
            }
        }
        controls.register('w,a,d');
    }

    update(delta) {
        this.head = this.nodes[0];
        if (controls.isDown('a')&&controls.isDown('w')) {
            this.head.angle-=3* delta;
        }
        if (controls.isDown('d')&&controls.isDown('w')) {
            this.head.angle+=3* delta;
        }
        if (controls.isDown('w')) {
            this.currentSpeed = this.speed;
            this.head.ax = this.head.bx + (this.head.length + this.currentSpeed * delta) * Math.cos(this.head.angle);
            this.head.ay = this.head.by + (this.head.length + this.currentSpeed * delta) * Math.sin(this.head.angle);
        }
        this.x = this.head.bx
        this.y = this.head.by
        this.nodes.forEach(node => {
            node.update()
        })
        this.branches.forEach(apendage => {
            apendage.update()
        })
        this.fireCooldown -= delta;
        if (!controls.keys.w.down) this.currentSpeed = Math.max(this.currentSpeed - this.deceleration * delta, 0);
    }
}