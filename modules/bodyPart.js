import segment from "../abstracts/segment.js";
// import {keyboard} from "../handlers/keyPress.js";

export default class BodyPart extends segment {
    constructor(length, ax, ay, angle, parent) {
        super(length, ax, ay, angle, parent);
        this.speed=0;
        this.angle=0;

    }

    skin(url) {

        this.sprite = PIXI.Sprite.from(url||"../assets/textures/body.png");
        this.sprite.anchor.set(0.5,0);
        this.sprite.pivot.set(0.5,0);
        this.sprite.width=50;
        this.sprite.height=this.length;
        // this.sprite.frame=new PIXI.Rectangle(0,0,50,this.length);
        globalThis.app.stage.addChild(this.sprite);
    }

    create() {
        super.create();
        if (!this.parent){
            window.addEventListener("keydown", this.handleKeyDown.bind(this));
            window.addEventListener("keyup", this.handleKeyUp.bind(this));
        }
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
        }else{
            this.angle+=this.tiltAngle||0;
            // this.ax+=this.speed||0;
            // this.ay+=this.speed||0;
            this.ax = this.ax + this.speed * Math.cos(this.angle);
            this.ay = this.ay + this.speed * Math.sin(this.angle);
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

    getAngle(ax, ay, bx, by) {
        return Math.atan2(by - ay, bx - ax);
    }

    setSpeed(speed){
        console.log('asdasd')
        this.speed=speed;
    }
    tilt(angle){
        console.log('aaaaaa')
        this.tiltAngle=angle;
    }
    handleKeyDown(e) {
        switch (e.keyCode) {
            case 87:
                this.speed=7;
                break;
            case 65:
                this.tiltAngle=-0.05;
                break;
            case 68:
                this.tiltAngle=0.05;
                break;
        }
    }
    handleKeyUp(e) {
        switch (e.keyCode) {
            case 87:
                this.speed=0;
                break;
            case 65:
                this.tiltAngle=0;
                break;
            case 68:
                this.tiltAngle=0;
                break;

        }
    }
}