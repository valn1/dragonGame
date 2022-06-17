class keyHandler {
    constructor() {
        this.keys = {};
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);
        window.addEventListener('keydown',this.keyDown);
        window.addEventListener('keyup',this.keyUp);
    }

    keyDown(e) {
        if (this.keys[e.key] && !this.keys[e.key].down) {
            this.keys[e.key].down = true;
            this.keys[e.key].onKeydown();
        }
    }

    keyUp(e) {
        if (this.keys[e.key] && this.keys[e.key].down) {
            this.keys[e.key].down = false;
            this.keys[e.key].onKeyup();
        }
    }

    isDown(key) {
        return this.keys[key].down;
    }

    register(keys, onKeydown=()=>{}, onKeyup=()=>{}) {
        keys.split(',').forEach(key => {
            this.keys[key] = {
                onKeydown,
                onKeyup,
                down: false
            };
        });
    }

    edit(oldKey, newKey) {
        if (this.keys[oldKey] && !this.keys[newKey]) {
            return delete Object.assign(this.keys, {[newKey]: this.keys[oldKey]})[oldKey];
        }
        return false;
    }
}

export const controls = new keyHandler();