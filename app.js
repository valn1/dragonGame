import Dragon from "./gameObjects/dragon.js";
import ProjectilePool from "./abstracts.projectile.js";

//setup
globalThis.app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true
});
let app = globalThis.app;
app.stage.interactive = true;
app.renderer.view.style.position = 'absolute'
document.body.appendChild(app.view);
app.stage.position.set(app.screen.width / 2, app.screen.height / 2);
app.stage.scale.set(.5)
app.stage.rotation = 0
app.stage.pivot.set(app.screen.width / 2, app.screen.height / 2);

//setup dragon
let dragon = new Dragon(5);
window.dragon = dragon;
dragon.create();

//legs for temporary visual reference
for (let i = 0; i < 1000; i++) {
    let stuff = PIXI.Sprite.from('./assets/textures/arm.png')
    globalThis.app.stage.addChild(stuff);
    stuff.position.set(Math.random() * app.screen.width*50, Math.random() * app.screen.height*50);
}

//setup projectile pool
let projectiles = new ProjectilePool(200);

app.ticker.add(() => {
    app.width = window.innerWidth;
    app.height = window.innerHeight;

    dragon.update();
    projectiles.update(app.ticker.deltaMS/1000);

    app.stage.pivot.set(dragon.x, dragon.y);

});


