import segment from "../abstracts/segment.js";

export default class Limb extends segment {
    constructor(length, parent, whereInparent, side) {
        super(length, 0, 0, 0, parent);
        this.whereInParent = whereInparent * parent.length;
        this.speed = 0;
        this.side = side;
    }

    skin(url) {
        this.sprite = PIXI.Sprite.from(url || "../assets/textures/Dragon Back Segment.png");
        this.sprite.anchor.set(0.5, 1);
        this.sprite.pivot.set(0.5, 1);
        this.sprite.width = 13*2.5;
        this.sprite.height = 30*2.5;
        globalThis.app.stage.addChild(this.sprite);
    }

    create() {
        super.create();
        this.angle = this.parent.angle;
        this.skin(this.side === "left" ? "../assets/textures/Dragon Claw Left.png" : "../assets/textures/Dragon Claw Right.png");
        this.sprite.rotation = this.parent.angle + 90 * (Math.PI / 180) * (this.side === "right" ? 1 : 0);
    }

    update() {
        this.getA();
        this.calculatePointB();
        this.sprite.rotation = this.parent.angle+180 * (this.side === "right" ? 1 : 0) * (Math.PI / 180);
        this.sprite.position.set(this.ax, this.ay);
    }

    //get a point in the parent using whereInParent
    getA() {
        this.ax = this.parent.ax + this.whereInParent * Math.cos(this.parent.angle);
        this.ay = this.parent.ay + this.whereInParent * Math.sin(this.parent.angle);
    }
}