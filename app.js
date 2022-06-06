import Dragon from "./gameObjects/dragon.js";

//setup
globalThis.app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias:true
});
let app=globalThis.app;
app.stage.interactive = true;
app.renderer.view.style.position='absolute'
document.body.appendChild(app.view);
app.stage.position.set(app.screen.width/2, app.screen.height/2);
app.stage.scale.set(.5)
app.stage.rotation = 0
app.stage.pivot.set(app.screen.width/2, app.screen.height/2);
let dragon = new Dragon(5);
window.dragon= dragon;
dragon.create();
app.ticker.add(() => {
    app.width=window.innerWidth;
    app.height=window.innerHeight;

    dragon.update();

    app.stage.pivot.set(dragon.x, dragon.y);

});


