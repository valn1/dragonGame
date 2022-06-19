class Path {
  static DEFAULT = (duration) => {
    return new {
      duration,
      update: (currentX, currentY) => [currentX, currentY]
    }
  };
  
  static GO_TOWARD_DRAGON = (duration, speed) => {
    return {
      duration,
      speed,
      update: (currentX, currentY, dragonX, dragonY) => [x, y] //some function to go toward dragon
    }
  };

  static GO_TOWARD_FIXED_POINT = (duration, targetX, targetY, speed) => {
    return {
      duration,
      targetX,
      targetY,
      speed,
      update: (currentX, currentY) => [x, y]
    }
  };
}

class PathQueue {

  constructor(paths = [Path.DEFAULT(0)], loopOrNot = true) {
    this.paths = [];
    paths.forEach(p => this.addPath(p));
    this.pathIndex = 0;
    this.elapsedTime = 0;
    this.loopOrNot = loopOrNot;
  }

  addPath(path) {
    this.paths.concat(path);
    // there might be additional logic to do here
  }

  update(deltaMS) {
    this.elapsedTime += deltaMS;
    if (this.elapsedTime > this.paths[this.pathIndex].duration) {
      this.pathIndex += 1;
      if (this.pathIndex == this.paths.length() && this.loopOrNot) this.pathIndex = 0;
      this.elapsedTime = 0;
    }
    // call the update function for the current path segment, which should return new x,y
    // need to review args to give update, which get passed to update methods - should enemy xy and dragon xy be passed to all?
    [dx, dy] = this.paths[this.pathIndex]?.update([].slice.call(arguments, 1));
    return [dx, dy];
  }
}