class Enemy {
  static default = {
    hp: 0,
    sprite: null,
    path: null,
    active: false
  }

  // new enemies should only be initialized during construction of EnemyPool
  constructor() {
    Object.assign(this, Enemy.default);
  }

  // called by EnemyPool when creating a new enemy
  activate(x, y, ) {

  }
}

class EnemyPool {
  constructor(size) {
    this.pool = new Array(size);
    for (let i = 0; i < size; i++) this.pool[i] = new Enemy();
    this.activeEnemies = [];
  }

  fetch() {
    return this.pool.find(e => !e.active)
  }


}