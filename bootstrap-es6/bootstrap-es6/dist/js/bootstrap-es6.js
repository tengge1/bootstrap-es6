/**
 * bootstrap-es6
 * https://github.com/tengge1/bootstrap-es6.git
 */


// XType.js

class XType {

    static get(config) {
        if (config == null || config.xtype == null) {
            throw 'XType: config or config.xtype is undefined.';
        }
        var cls = XType.xtypes[config.xtype];
        if (cls == null) {
            throw `XType: xtype '${config.xtype}' is undefined.`;
        }
        return new cls(config);
    }

    static add(name, cls) {
        if (XType.xtypes[name] == null) {
            XType.xtypes[name] = cls;
        }
    }

    static remove(name) {
        delete XType.xtypes[name];
    }

}

XType.xtypes = {};

// XCache.js

class XCache {

    static get(name) {
        if (name == null) {
            return null;
        }
        var obj = XCache.components[name];
        return obj == undefined ? null : obj;
    }

    static add(name, obj) {
        if (name == null) {
            return;
        }
        if (XCache.components[name] == null) {
            XCache.components[name] = obj;
        }
    }

    static remove(name) {
        delete XCache.components[name];
    }

}

XCache.components = {};

// XEvent.js

class XEvent {

    constructor(target, listener, scope) {
        if (!target instanceof HTMLElement) {
            throw 'XEvent: target is not an instance of HTMLElement.';
        }
        this.target = target;
        this.listener = listener || {};
        this.scope = scope;
        this.eventNames = [];
        this.events = [];
        Object.keys(this.listener).forEach((n, i) => {
            if (n.startsWith('on')) {
                n = n.substr(2, n.length - 2);
            }
            var event = {
                eventName: n,
                callback: this.listener['on' + n],
                scope: this.scope == null ? this : this.scope
            };
            this.events.push(event);
            this._listen(n, event);
        });
        this.enabled = true;
    }

    enable() {
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
    }

    add(eventName, callback, scope) {
        if (eventName == null) {
            throw 'XEvent: eventName is undefined.'
        }
        if (eventName.startsWith('on')) {
            eventName = eventName.substr(2, eventName.length - 2);
        }
        var event = {
            eventName: eventName,
            callback: callback,
            scope: scope
        };
        this.events.push(event);
        this._listen(eventName, event);
    }

    remove(eventName, callback) {
        if (eventName == null) {
            throw 'XEvent: eventName is undefined.'
        }
        if (eventName.startsWith('on')) {
            eventName = eventName.substr(2, eventName.length - 2);
        }
        for (var i = 0; i < this.events.length; i++) {
            var event = this.events[i];
            if (eventName == event.eventName && callback == event.callback) {
                var index = this.events.indexOf(event);
                this.events.splice(index, 1);
            }
        }
    }

    _listen(eventName, event) {
        if (eventName == null) {
            throw 'XEvent: eventName is undefined.'
        }
        if (eventName.startsWith('on')) {
            eventName = eventName.substr(2, eventName.length - 2);
        }
        if (this.eventNames.indexOf(eventName) > -1) {
            return false;
        }
        this.eventNames.push(eventName);
        this.target.addEventListener(eventName, (e) => {
            if (!this.enabled) {
                return;
            }
            this.events.forEach((n, i) => {
                if (n.eventName == eventName && typeof (n.callback) == 'function') {
                    n.callback.call(n.scope == null ? this : n.scope, e);
                }
            });
        });
    }
}

// X.js

class X {

    static create(obj) {
        if (obj == null) {
            throw 'X: obj is undefined.';
        }
        if (obj instanceof XObject) {
            return obj;
        }
        if (obj.xtype == null) {
            throw 'X: obj.xtype is undefined';
        }
        return XType.get(obj);
    }

    static get(name) {
        return XCache.get(name);
    }

}

// XObject.js

class XObject {

    constructor(config) {
        this.config = config || {};
        this.container = this.config.container || document.body;
    }

    render() {

    }

}

XType.add('object', XObject);

// XHtml

class XHtml extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'This is XHtml.';

        this.el = {};
        this.hasRendered = false;
    }

    render() {
        if (this.hasRendered) {
            return;
        }
        if (this.container == document.body) {
            throw 'XHtml: container cannot be document.body.';
        }
        this.container.innerHTML = this.html;
        this.hasRendered = true;
    }

}

XType.add('html', XHtml);

// XContainer.js

class XContainer extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
        this.hasRendered = false;
    }

    render() {
        if (this.hasRendered) {
            return;
        }
        this.el.container = document.createElement('div');
        this.el.container.className = 'container';
        this.container.appendChild(this.el.container);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.container;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });

        this.hasRendered = true;
    }

}

XType.add('container', XContainer);

// XContainerFluid.js

class XContainerFluid extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
        this.hasRendered = false;
    }

    render() {
        if (this.hasRendered) {
            return;
        }
        this.el.container = document.createElement('div');
        this.el.container.className = 'container-fluid';
        this.container.appendChild(this.el.container);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.container;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });

        this.hasRendered = true;
    }

}

XType.add('containerfluid', XContainerFluid);

// XAlert.js

class XAlert extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || 'alert-primary';
        this.children = this.config.children || [];

        this.el = {};
        this.hasRendered = false;
    }

    render() {
        if (this.hasRendered) {
            return;
        }
        this.el.alert = document.createElement('div');
        this.el.alert.className = 'alert ' + this.cls;
        this.container.appendChild(this.el.alert);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.alert;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });

        this.hasRendered = true;
    }

}

XType.add('alert', XAlert);

