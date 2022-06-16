import segment from '../modules/bodyPart.js'
import limb from '../modules/limb.js'

export default class Dragon {

    constructor(nodesNumber) {
        this.nodesNumber = nodesNumber;
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.nodes = [];
        this.branches = [];
        this.currentSpeed = 0;
        this.speed = 800;
        this.moving = false;
        this.deceleration = 600;
        this.tiltAngle = 0;
        this.head=null;
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
            if (i){
                if (i===this.nodesNumber-1){
                    bodyPart.skin('../assets/textures/Dragon Tail.png');
                }else{
                    bodyPart.skin();
                }

            }else{
                bodyPart.skin('../assets/textures/Dragon Head WIP.png')
            }

            if (i===5||i===1){
                let appendage=new limb(50,this.nodes[i], .5,'left');
                this.branches.push(appendage)
                appendage.create();
                let appendage2 = new limb(50,this.nodes[i], .5,'right');
                this.branches.push(appendage2)
                appendage2.create();
            }
        }

        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));

    }

    update(delta) {
        this.head = this.nodes[0];
        this.head.angle += this.tiltAngle * delta;
        this.x = this.head.bx
        this.y = this.head.by
        this.head.ax = this.head.bx + (this.head.length + this.currentSpeed * delta) * Math.cos(this.head.angle);
        this.head.ay = this.head.by + (this.head.length + this.currentSpeed * delta) * Math.sin(this.head.angle);
        this.nodes.forEach(node => {
            node.update()
        })
        this.branches.forEach(apendage => {
            apendage.update()
        })
        this.fireCooldown -= delta;
        if (!this.moving) this.currentSpeed = Math.max(this.currentSpeed - this.deceleration * delta, 0);
    }

    handleKeyDown(e) {
        switch (e.keyCode) {
            case 87:
                this.currentSpeed = this.speed;
                this.moving = true;
                break;
            case 65:
                this.tiltAngle = -3;
                break;
            case 68:
                this.tiltAngle = 3;
                break;
        }
    }

    handleKeyUp(e) {
        switch (e.keyCode) {
            case 87:
                this.moving = false;
                break;
            case 65:
                this.tiltAngle = 0;
                break;
            case 68:
                this.tiltAngle = 0;
                break;
        }
    }
}