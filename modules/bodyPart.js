import segment from "../abstracts/segment.js";

export default class BodyPart extends segment {
    constructor(length, ax, ay, angle, parent) {
        super(length, ax, ay, angle, parent);
        this.speed=0;
    }

    skin(url) {
        this.sprite = PIXI.Sprite.from(url||"../assets/textures/Dragon Back Segment.png");
        this.sprite.anchor.set(0.5,0);
        this.sprite.pivot.set(0.5,0);
        this.sprite.width=75;
        this.sprite.height=this.length*1.25;
        globalThis.app.stage.addChild(this.sprite);
    }

    create() {
        super.create();
        this.angle=this.getAngle(this.bx,this.by,this.ax,this.ay);
    }

    update() {
        this.getA();
        super.calculatePointB();
        if (this.parent) {
            this.angle=this.getAngle(this.ax, this.ay, this.bx, this.by);
        }
        this.sprite.rotation = this.angle - (90 * (Math.PI / 180));
        if (!this.parent) {
            console.log(this.ax, this.ay, this.bx, this.by);
        }
        this.sprite.position.set(this.ax, this.ay);
    }

    getA() {
        if (this.parent) {
            this.ax = this.parent.bx;
            this.ay = this.parent.by;
        }
    }

    getAngle(ax, ay, bx, by) {
        return Math.atan2(by - ay, bx - ax);
    }
}