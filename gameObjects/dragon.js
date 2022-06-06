import segment from '../modules/bodyPart.js'
// import branch from '../modules/IKSegmentBranch.js'

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
            i ? this.nodes[i].skin() : this.nodes[i].skin('../assets/textures/head.png');

            // if (i===3||i===1){
            //     let appendage=new branch(50,60,this.nodes[i], .3)
            //     this.branches.push(appendage)
            //     appendage.create();
            //     let appendage2 = new branch(50,300,this.nodes[i], .5)
            //     this.branches.push(appendage2)
            //     appendage2.create();
            // }
        }

        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));

    }

    update() {
        this.nodes.forEach(node => {
            node.update()
        })
        this.branches.forEach(apendage => {
            apendage.update()
        })
        this.x = this.nodes[0].bx
        this.y = this.nodes[0].by
        this.nodes[0].angle += this.tiltAngle || 0;
        this.nodes[0].ax = this.nodes[0].bx + (this.nodes[0].length + this.speed) * Math.cos(this.nodes[0].angle);
        this.nodes[0].ay = this.nodes[0].by + (this.nodes[0].length + this.speed) * Math.sin(this.nodes[0].angle);
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