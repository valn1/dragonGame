export default class segment {
    constructor(length, ax, ay, angle, parent) {
        this.length = length;
        this.ax = ax || 0;
        this.ay = ay || 0;
        this.angle = angle;
        this.parent = parent;
    }

    create() {
        this.getA();
        this.getBByAngle();
    }

    getA() {
        if (this.parent) {
            this.ax = this.parent.bx;
            this.ay = this.parent.by;
        }else{
            // this.ax=globalThis.app.renderer.plugins.interaction.mouse.global.x;
            // this.ay=globalThis.app.renderer.plugins.interaction.mouse.global.y;
        }
    }

    calculatePointB() {
        this.bx = this.ax + this.length * ((this.bx - this.ax) /
            Math.sqrt((this.bx - this.ax) ** 2 + (this.by - this.ay) ** 2));
        this.by = this.ay + this.length * ((this.by - this.ay) /
            Math.sqrt((this.bx - this.ax) ** 2 + (this.by - this.ay) ** 2));
    }

    getBByAngle(angle = this.angle) {
        this.bx = this.ax + this.length * Math.cos(angle);
        this.by = this.ay + this.length * Math.sin(angle);
    }
}