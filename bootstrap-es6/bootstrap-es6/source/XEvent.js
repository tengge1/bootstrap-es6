// XEvent.js

class XEvent {

    constructor(target, listener, scope) {
        if (!target instanceof HTMLElement) {
            throw 'XEvent: target is not an instance of HTMLElement.';
        }
        this.target = target;
        this.listener = listener || {};
        this.scope = scope;
        Object.keys(this.listener).forEach((n, i) => {
            if (n.startsWith('on')) {
                n = n.substr(2, n.length - 2);
            }
            this.target.addEventListener(n, (e) => {
                if (typeof (this.listener[n]) == 'function') {
                    listener[n].call(this.scope == null ? n : scope, e);
                }
            });
        });
    }

    add(eventName, callback) {
        if (eventName == null) {
            throw 'XEvent: eventName is undefined.'
        }
        if (eventName.startsWith('on')) {
            eventName = eventName.substr(2, eventName.length - 2);
        }
        this.listener
    }

    remove(eventName, callback) {
        if (eventName == null) {
            throw 'XEvent: eventName is undefined.'
        }
        if (eventName.startsWith('on')) {
            eventName = eventName.substr(2, eventName.length - 2);
        }
    }

}