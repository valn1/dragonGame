class Projectile {
  static default = {
    x: 0,
    y: 0,
    vector: [0,0],
    sprite: null,
    timeout: 1.0,
    destroyOnCollision: true,
    active: false
  }

  static radiansSpeedToVector(radians, speed) {
    return [Math.cos(radians)*speed, Math.sin(radians)*speed];
  }

  // new projectiles should only be initialized during construction of a ProjectilePool
  constructor() {
    this.reset(); //in theory since reset just sets to default object props, this should work
  }

  // called by ProjectilePool when creating a new projectile - active indicates it should be rendered
  activate(x, y, vector, spriteUrl, timeout, destroyOnCollision) {
    this.x = x || this.x;
    this.y = y || this.y;
    this.vector = vector || this.vector;
    this.sprite = PIXI.sprite.from(spriteUrl) || this.sprite;
    this.sprite.anchor.set(0.5);
    this.sprite.pivot.set(0.5);
    globalThis.app.stage.addChild(this.sprite);
    this.timeout = timeout || this.timeout;
    this.destroyOnCollision = destroyOnCollision || this.destroyOnCollision;
    this.active = true;
  }

  // takes delta time and updates position
  update(delta) {
    this.x = this.x + this.vector[0] * delta;
    this.y = this.y + this.vector[1] * delta;
    this.sprite.position.set(this.x, this.y);
    this.timeout -= delta;
  }

  // this method resets projectile to default values
  // I don't know if this is going to work correctly
  reset() {
    this.Object = Object.assign(this.Object, Projectile.default);
  }
}

export default class ProjectilePool {
  constructor(size) {
    this.pool = new Array(size).fill(new Projectile());
    this.activeProjectiles = [];
  }

  // returns first inactive projectile
  fetch() {
    return this.pool.find(e => e.active == false);
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
    // am I correct to assume zero node is head? may need to update if projectiles can spawn from other places (ie from a claw / tail)
    p.activate(
      spawnObject.nodes[0].ax, spawnObject.nodes[0].ay, 
      Projectile.radiansSpeedToVector(spawnObject.tiltAngle, spawnObject.speed + dSpeed), 
      spriteUrl, timeout, destroyOnCollision);
    this.activeProjectiles.push(p);
  }

  //updates position for all active projectiles. If timeout has passed for a projectile, resets to default and removes it from active array.
  update(delta) {
    let newActive = [...this.activeProjectiles];
    let removedCount = 0;
    this.activeProjectiles.forEach((e, i) => {
      e.update(delta);
      if (e.timeout <= 0) {
        globalThis.app.stage.removeChild(e);
        e.reset();
        newActive = newActive.splice(i-removedCount, 1);
        removedCount += 1;
      }
    });
    this.activeProjectiles = newActive;
  }
}