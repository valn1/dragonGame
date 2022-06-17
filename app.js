import Dragon from "./gameObjects/dragon.js";
import ProjectilePool from "./abstracts/projectile.js";
import {controls} from "./Helpers/keyHandler.js";

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

//make a grid to be able to see the character movimentation easier
let grid = new PIXI.Graphics();
app.stage.addChild(grid);
grid.lineStyle(1, 0xFFFFFF, .1);
for (let i = -1000000; i < 1000000; i+=200) {
    grid.moveTo(i, -1000000);
    grid.lineTo(i, 1000000);
    grid.moveTo(-1000000, i);
    grid.lineTo(1000000, i);
}

app.stage.pivot.set(app.screen.width / 2, app.screen.height / 2);
//setup projectile pool

let projectiles = new ProjectilePool(2000);
//setup dragon
let dragon = new Dragon(8);
window.dragon = dragon;

dragon.create();
//draw a grid with lines



app.ticker.add(() => {
    app.width = window.innerWidth;
    app.height = window.innerHeight;

    dragon.update(app.ticker.deltaMS/1000);
    projectiles.update(app.ticker.deltaMS/1000);

    app.stage.pivot.set(dragon.x, dragon.y);
});

controls.register(' ', () => {if (dragon.fireCooldown < 0) {
    projectiles.createOnObject(dragon, 1000, '../assets/textures/Fireball.png', 2, 5, true);
    dragon.fireCooldown = .4;
}})

// window.addEventListener("keydown", handleKeyDown.bind(this));
//
// function handleKeyDown(e) {
//     switch (e.keyCode) {
//       case 32:
//         if (dragon.fireCooldown < 0) {
//           projectiles.createOnObject(dragon, 1000, '../assets/textures/Fireball.png', 2, 5, true);
//           dragon.fireCooldown = .4;
//         }
//         break;
//     }
// }