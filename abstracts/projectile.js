class Projectile {
  static default = {
    x: 0,
    y: 0,
    vector: [0,0],
    sprite: null,
    timeout: 0,
    destroyOnCollision: true,
    active: false
  }

  static radiansSpeedToVector(radians, speed) {
    return [Math.cos(radians)*speed, Math.sin(radians)*speed];
  }

  // new projectiles should only be initialized during construction of a ProjectilePool
  constructor() {
    this.x = Projectile.default.x;
    this.y = Projectile.default.y;
    this.vector = Projectile.default.vector;
    this.sprite = Projectile.default.sprite;
    this.timeout = Projectile.default.timeout;
    this.destroyOnCollision = Projectile.default.destroyOnCollision;
    this.active = Projectile.default.active;
  }

  // called by ProjectilePool when creating a new projectile - active indicates it should be rendered
  activate(x, y, vector, spriteUrl, timeout, destroyOnCollision) {
    this.x = x || this.x;
    this.y = y || this.y;
    this.vector = vector || this.vector;
    this.sprite = PIXI.Sprite.from(spriteUrl) || this.sprite;
    this.sprite.anchor.set(0.5);
    this.sprite.pivot.set(0.5);
    globalThis.app.stage.addChild(this.sprite);
    this.timeout = timeout || this.timeout;
    this.destroyOnCollision = destroyOnCollision || this.destroyOnCollision;
    this.active = true;
    console.log('activated projectile');
  }

  // takes delta time and updates position
  update(delta) {
    this.x = this.x + this.vector[0] * delta;
    this.y = this.y + this.vector[1] * delta;
    this.sprite ?.position.set(this.x, this.y);
    //If possible, maybe figure out how to solve this race condition - an error is being thrown by the next update loop when it tries to update position after the object has been reset, but not removed from the active pool by the time the next update hits
    //this.sprite.position.set(this.x, this.y);
    this.timeout -= delta;
  }

  // this method resets projectile to default values
  reset() {
    this.x = Projectile.default.x;
    this.y = Projectile.default.y;
    this.vector = Projectile.default.vector;
    this.sprite = Projectile.default.sprite;
    this.timeout = Projectile.default.timeout;
    this.destroyOnCollision = Projectile.default.destroyOnCollision;
    this.active = Projectile.default.active;
  }
}

export default class ProjectilePool {
  constructor(size) {
    this.pool = new Array(size);
    for (let i = 0; i < size; i++) this.pool[i] = new Projectile();
    this.activeProjectiles = [];
  }

  // returns first inactive projectile
  fetch() {
    return this.pool.find(e => !e.active);
  }

  // creates a projectile with manual args (no spawn object)
  create(x, y, angle, speed, spriteUrl, timeout, destroyOnCollision) {
    let p = this.fetch();
    p.activate(
      x, y, 
      Projectile.radiansSpeedToVector(angle, speed),
      spriteUrl, timeout, destroyOnCollision);
    this.activeProjectiles.push(p);
  }

  // version of create which takes a game object as argument to infer position and angle / speed
  // dSpeed is additional speed of the projectile
  createOnObject(spawnObject, dSpeed, spriteUrl, timeout, destroyOnCollision) {
    let p = this.fetch();
    p.activate(
      spawnObject.nodes[0].ax, spawnObject.nodes[0].ay, 
      Projectile.radiansSpeedToVector(Math.random()*6.28, spawnObject.speed + dSpeed), 
      spriteUrl, timeout, destroyOnCollision);
    this.activeProjectiles.push(p);
  }

  //updates position for all active projectiles. If timeout has passed for a projectile, resets to default and removes it from active array.
  update(delta) {
    let removedCount = 0;
    if (this.activeProjectiles.length > 0) {
      this.activeProjectiles.forEach((e, i) => {
        if (e.timeout < 0) {
          globalThis.app.stage.removeChild(e.sprite);
          e.reset();
          this.activeProjectiles.splice(i-removedCount, 1);
          removedCount += 1;
        } 
        e.update(delta);
      });
    }
  }
}