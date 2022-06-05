import segment from '../modules/bodyPart.js'
// import branch from '../modules/IKSegmentBranch.js'

export default class Dragon {
    constructor(nodesNumber){
        this.nodesNumber=nodesNumber;
        this.x=window.innerWidth/2;
        this.y=window.innerHeight/2;
        this.nodes=[];
        this.branches=[];
    }

    create(){

        for (let i = 0; i < this.nodesNumber; i++) {
            let bodyPart= new segment(
                i?75:100,
                i?this.nodes[i-1].bx:this.x,
                i?this.nodes[i-1].by:this.y,
                1+i*0.001,
                i?this.nodes[i-1]:null
            );
            this.nodes.push(bodyPart);
            !i?bodyPart.dragon=this:null;
            bodyPart.create();
            i?this.nodes[i].skin('../assets/textures/scales.jpg'):this.nodes[i].skin('../assets/textures/head.png');

            if (i===3||i===1){
                let appendage=new branch(50,60,this.nodes[i], .3)
                this.branches.push(appendage)
                appendage.create();
                let appendage2 = new branch(50,300,this.nodes[i], .5)
                this.branches.push(appendage2)
                appendage2.create();
            }
        }
    }

    update(){
        this.nodes.forEach(node=>{
            node.update()
        })
        this.branches.forEach(apendage=>{
            apendage.update()
        })
        this.x=this.nodes[0].bx
        this.y=this.nodes[0].by
    }
}