import segment from "../abstracts/segment.js";

export default class BodyPart extends segment {
    constructor(length, ax, ay, angle, parent) {
        super(length, ax, ay, angle, parent);
        this.speed=0;
    }

    skin(url) {
        this.sprite = PIXI.Sprite.from(url||"../assets/textures/body.png");
        this.sprite.anchor.set(0.5,0);
        this.sprite.pivot.set(0.5,0);
        this.sprite.width=50;
        this.sprite.height=this.length;
        globalThis.app.stage.addChild(this.sprite);
    }

    create() {
        super.create();
        this.angle=this.getAngle(this.bx,this.by,this.ax,this.ay);
    }

    update() {
        this.getA();
        this.calculatePointB();
        this.sprite.rotation = this.getAngle(this.ax, this.ay, this.bx, this.by) - (90 * (Math.PI / 180));
        this.sprite.position.set(this.ax, this.ay);
    }

    getA() {
        if (this.parent) {
            this.ax = this.parent.bx;
            this.ay = this.parent.by;
        }
    }

    calculatePointB() {
        this.bx = this.ax + this.length * ((this.bx - this.ax) /
            Math.sqrt((this.bx - this.ax) ** 2 + (this.by - this.ay) ** 2));
        this.by = this.ay + this.length * ((this.by - this.ay) /
            Math.sqrt((this.bx - this.ax) ** 2 + (this.by - this.ay) ** 2));
    }

    getAngle(ax, ay, bx, by) {
        return Math.atan2(by - ay, bx - ax);
    }
}