export default class segment {
    constructor(length,ax,ay,angle) {
        this.length = length;
        this.ax = ax||0;
        this.ay = ay||0;
        this.angle = angle;
    }
    create() {
    }
    skin(url){

    }
    update() {

    }
    getBByAngle(angle=this.angle) {
        this.bx = this.ax + this.length * Math.cos(angle);
        this.by = this.ay + this.length * Math.sin(angle);
    }
    calculatePointB(){
        this.bx = this.ax+this.length*((this.bx-this.ax)/
            Math.sqrt((this.bx-this.ax)**2+(this.by-this.ay)**2));
        this.by = this.ay+this.length*((this.by-this.ay)/
            Math.sqrt((this.bx-this.ax)**2+(this.by-this.ay)**2));
    }
}