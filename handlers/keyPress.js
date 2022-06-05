class Keyboard {
    constructor() {
        this.keys = [];
        this.addEventListeners();
    }

    keydown(key, callback) {
        const event = {
            key, callback, remove: function () {
                keyboard.removeSubscription(this)
            }
        }
        this.keys.push(event)
        return event;
    }

    keyup(key, callback) {
        const event = {
            key, callback, remove: function () {
                keyboard.removeSubscription(this)
            }
        }
    }

    removeSubscription(value) {
        this.keys = this.keys.filter(e => e.key !== value)
    }

    addEventListeners() {
        window.addEventListener("keydown", this.downHandler.bind(this), false);
        window.addEventListener("keyup", this.upHandler.bind(this), false);
    }

    private downHandler(event) {
        this.keys.forEach(key => {
            if (key.key === event.key && !key.pressed) {
                key.pressed = true;
                key.callback(event);
            }
        });
    }

    private upHandler(event) {
        this.keys.forEach(key => {
            if (key.key === event.key && key.pressed) {
                key.pressed = false;
                key.callback(event);
            }
        });
    }
}
export const keyboard = new Keyboard();