import segment from '../modules/bodyPart.js'
import limb from '../modules/limb.js'

export default class Dragon {

    constructor(nodesNumber) {
        this.nodesNumber = nodesNumber;
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.nodes = [];
        this.branches = [];
        this.speed = 0;
        this.tiltAngle = 0;
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
                let appendage=new limb(50,this.nodes[i], .3,'left');
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

    update() {
        let head = this.nodes[0];
        head.angle += this.tiltAngle;
        this.x = head.bx
        this.y = head.by
        head.ax = head.bx + (head.length + this.speed) * Math.cos(head.angle);
        head.ay = head.by + (head.length + this.speed) * Math.sin(head.angle);
        this.nodes.forEach(node => {
            node.update()
        })
        this.branches.forEach(apendage => {
            apendage.update()
        })
    }

    handleKeyDown(e) {
        switch (e.keyCode) {
            case 87:
                this.speed = 20;
                break;
            case 65:
                this.tiltAngle = -0.05;
                break;
            case 68:
                this.tiltAngle = 0.05;
                break;
        }
    }

    handleKeyUp(e) {
        switch (e.keyCode) {
            case 87:
                this.speed = 0;
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