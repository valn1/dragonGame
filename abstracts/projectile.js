class Projectile {
  static default = {
    x = 0,
    y = 0,
    vector = [0,0],
    sprite = null,
    timeout = 1.0,
    destroyOnCollision = true;
  }
  
  constructor(x, y, vector, sprite, timeout, destroyOnCollision) {
    this.x = x || Projectile.default.x;
    this.y = y || Projectile.default.y;
    this.vector = vector || Projectile.default.vector;
    this.sprite =  sprite || Projectile.default.sprite;
    this.timeout = timeout || Projectile.default.timeout;
    this.destroyOnCollision = destroyOnCollision || Projectile.default.destroyOnCollision;
  }
}

class ProjectilePool {
  constructor(size) {
    this.pool = new Array(size).fill(new Projectile());
  }
}