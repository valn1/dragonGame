// class Keyboard {
//     constructor() {
//         this.keys = {};
//         this.addEventListeners();
//     }
//
//     keydown(key, callback) {
//         keyboard.keys[key].keydown?null:keyboard.keys[key].keydown=[];
//         keyboard.keys[key].keydown.push(callback);
//     }
//
//     keyup(key, callback) {
//         keyboard.keys[key].keyup = callback;
//     }
//
//     removeSubscription(value) {
//         keyboard.keys = this.keys.filter(e => e.key !== value)
//     }
//
//     addEventListeners() {
//         window.addEventListener("keydown", this.downHandler, false);
//         window.addEventListener("keyup", this.upHandler, false);
//     }
//
//     downHandler(event) {
//         keyboard.keys.forEach(key => {
//             if (key.key === event.key && !key.pressed) {
//                 key.pressed = true;
//                 key.callback(event);
//             }
//         });
//     }
//
//     upHandler(event) {
//         keyboard.keys.forEach(key => {
//             if (key.key === event.key && key.pressed) {
//                 key.pressed = false;
//                 key.callback(event);
//             }
//         });
//     }
// }
//
// export const keyboard = new Keyboard();