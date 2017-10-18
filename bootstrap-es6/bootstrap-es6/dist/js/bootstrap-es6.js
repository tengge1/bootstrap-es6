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
    }

    render() {
        this.el.html = document.createElement('div');
        this.el.html.innerHTML = this.html;
        this.container.appendChild(this.el.html);
    }

}

XType.add('html', XHtml);

// XChild.js

class XChild extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.children = document.createElement('div');
        this.container.appendChild(this.el.children);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.children;

            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('child', XChild);

// XContainer.js

class XContainer extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
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
    }

}

XType.add('container', XContainer);

// XContainerFluid.js

class XContainerFluid extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
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
    }

}

XType.add('containerfluid', XContainerFluid);

// XRow.js

class XRow extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.row = document.createElement('div');
        this.el.row.className = 'row';
        this.container.appendChild(this.el.row);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.row;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('row', XRow);

// XCol.js

class XCol extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || 'col';
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.col = document.createElement('div');
        this.el.col.className = this.cls;
        this.container.appendChild(this.el.col);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.col;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('col', XCol);

// XMedia.js

class XMedia extends XObject {

    constructor(config) {
        super(config);
        this.imgSrc = this.config.imgSrc || null;
        this.imgCls = this.config.imgCls || 'd-flex mr-3'
        this.imgAlt = this.config.imgAlt || null;
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        if (this.imgSrc == null) {
            throw 'XMedia: config.imgSrc is undefined.';
        }

        this.el.media = document.createElement('div');
        this.el.media.className = 'media';
        this.container.appendChild(this.el.media);

        this.el.img = document.createElement('img');
        this.el.img.src = this.imgSrc;
        this.el.img.className = this.imgCls;
        this.el.img.alt = this.imgAlt;
        this.el.media.appendChild(this.el.img);

        this.el.mediaBody = document.createElement('div');
        this.el.mediaBody.className = 'media-body';
        this.el.media.appendChild(this.el.mediaBody);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.mediaBody;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('media', XMedia);


// XList.js

class XList extends XObject {

    constructor(config) {
        super(config);
        this.unstyled = this.config.unstyled || false;
        this.inline = this.config.inline || false;
        this.tagName = this.config.tagName || 'ul';
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.list = document.createElement(this.tagName);
        if (this.inline) {
            this.el.list.className = 'list-inline';
        } else if (this.unstyled) {
            this.el.list.className = 'list-unstyled';
        }
        this.container.appendChild(this.el.list);

        this.el.li = [];

        this.children.forEach((n, i) => {
            this.el.li[i] = document.createElement('li');
            if (this.inline) {
                this.el.li[i].className = 'list-inline-item';
            }
            this.el.list.appendChild(this.el.li[i]);

            var obj = X.create(n);
            obj.container = this.el.li[i];
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('list', XList);

// DefinitionList.js

class XDefinitionList extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.dl = document.createElement('dl');
        this.container.appendChild(this.el.dl);
        this.children.forEach((n, i) => {
            var obj = X.create(n);
            if (!obj instanceof XDefinitionItem) {
                throw 'XDefinitionList: config.children is not an array of instance of XDefinitionItem';
            }
            obj.container = this.el.dl;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('definitionlist', XDefinitionList);


// XDefinitionItem.js

class XDefinitionItem extends XObject {

    constructor(config) {
        super(config);
        this.title = this.config.title || 'title';
        this.text = this.config.text || 'text';

        this.el = {};
    }

    render() {
        if (this.container == null) {
            throw 'XDefinitionItem: config.container is undefined.';
        }
        if (this.container.tagName == null || this.container.tagName.toLowerCase() != 'dl') {
            throw 'XDefinitionItem: config.container is not HTMLElement';
        }
        this.el.dt = document.createElement('dt');
        this.el.dt.innerHTML = this.title;
        this.container.appendChild(this.el.dt);
        this.el.dd = document.createElement('dd');
        this.el.dd.innerHTML = this.text;
        this.container.appendChild(this.el.dd);
    }

}

XType.add('definitionitem', XDefinitionItem);

// XCode.js

class XCode extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';
        this.inline = this.config.inline || false;
        this.scrollable = this.config.scrollable || false;

        this.el = {};
    }

    render() {
        if (this.inline) {
            this.el.code = document.createElement('code');
        } else {
            this.el.code = document.createElement('pre');
            if (this.scrollable) {
                this.el.code.className = 'pre-scrollable';
            }
        }
        this.el.code.innerHTML = this.html;
        this.container.appendChild(this.el.code);
    }

}

XType.add('code', XCode);

// XImage.js

class XImage extends XObject {

    constructor(config) {
        super(config);
        this.src = this.config.src || '';
        this.cls = this.config.cls || null;
        this.alt = this.config.alt || null;

        this.el = {};
    }

    render() {
        this.el.image = document.createElement('img');
        this.el.image.src = this.src;
        if (this.cls) {
            this.el.image.className = this.cls;
        }
        if (this.alt) {
            this.el.image.alt = this.alt;
        }
        this.container.appendChild(this.el.image);
    }

}

XType.add('image', XImage);

// XTable.js

class XTable extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];
        this.dark = this.config.dark || false;
        this.striped = this.config.striped || false;
        this.bordered = this.config.bordered || false;
        this.hover = this.config.hover || false;
        this.sm = this.config.sm || false;

        this.el = {};
    }

    render() {
        this.el.table = document.createElement('table');
        this.el.table.className = 'table';
        if (this.dark) {
            this.el.table.className += ' table-dark';
        }
        if (this.striped) {
            this.el.table.className += ' table-striped';
        }
        if (this.bordered) {
            this.el.table.className += ' table-bordered';
        }
        if (this.hover) {
            this.el.table.className += ' table-hover';
        }
        if (this.sm) {
            this.el.table.className += ' table-sm';
        }
        this.container.appendChild(this.el.table);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.table;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('table', XTable);

// XTHead.js

class XTHead extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.thead = document.createElement('thead');
        this.container.appendChild(this.el.thead);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.thead;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });

    }

}

XType.add('thead', XTHead);


// XTBody.js

class XTBody extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.tbody = document.createElement('tbody');
        this.container.appendChild(this.el.tbody);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.tbody;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('tbody', XTBody);

// XTR.js

class XTR extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || null;
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.tr = document.createElement('tr');
        if (this.cls) {
            this.el.tr.className = this.cls;
        }
        this.container.appendChild(this.el.tr);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.tr;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('tr', XTR);

// XTH.js

class XTH extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.th = document.createElement('th');
        this.container.appendChild(this.el.th);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.th;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('th', XTH);

// XTD.js

class XTD extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.td = document.createElement('td');
        this.container.appendChild(this.el.td);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.td;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('td', XTD);

// XFigure.js

class XFigure extends XObject {

    constructor(config) {
        super(config);
        this.src = this.config.src || '';
        this.alt = this.config.alt || null;
        this.title = this.config.title || null;

        this.el = {};
    }

    render() {
        this.el.figure = document.createElement('figure');
        this.el.figure.className = 'figure';
        this.container.appendChild(this.el.figure);

        this.img = document.createElement('img');
        this.img.className = 'figure-img img-fluid rounded';
        this.img.src = this.src;
        if (this.img.alt) {
            this.img.alt = this.alt;
        }
        this.el.figure.appendChild(this.img);

        if (this.title) {
            this.el.figcaption = document.createElement('figcaption');
            this.el.figcaption.className = 'figure-caption';
            this.el.figcaption.innerHTML = this.title;
            this.el.figure.appendChild(this.el.figcaption);
        }
    }

}

XType.add('figure', XFigure);

// XAlert.js

class XAlert extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || 'alert-primary';
        this.closable = this.config.closable || true;
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
        this.el.alert.role = 'alert';
        this.container.appendChild(this.el.alert);

        if (this.closable) {
            this.el.closeBtn = document.createElement('button');
            this.el.closeBtn.type = 'button';
            this.el.closeBtn.className = 'close';
            this.el.closeBtn.setAttribute('data-dismiss', 'alert');
            this.el.alert.appendChild(this.el.closeBtn);

            this.el.closeIcon = document.createElement('span');
            this.el.closeIcon.innerHTML = '&times;';
            this.el.closeBtn.appendChild(this.el.closeIcon);
        }

        this.el.alertBody = document.createElement('div');
        this.el.alertBody.className = 'alert-body';
        this.el.alert.appendChild(this.el.alertBody);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.alertBody;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });

        this.hasRendered = true;
    }

}

XType.add('alert', XAlert);

// XBadge.js

class XBadge extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'Badge';
        this.cls = this.config.cls || 'badge-primary';

        this.el = {};
        this.hasRendered = false;
    }

    render() {
        if (this.hasRendered) {
            return;
        }
        this.el.badge = document.createElement('span');
        this.el.badge.innerHTML = this.text;
        this.el.badge.className = 'badge ' + this.cls;
        this.container.appendChild(this.el.badge);
        this.hasRendered = true;
    }

}

XType.add('badge', XBadge);

// XBreadcrumb.js

class XBreadcrumb extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.ol = document.createElement('ol');
        this.el.ol.className = 'breadcrumb';
        this.container.appendChild(this.el.ol);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            if (!obj instanceof XBreadcrumbItem) {
                throw 'XBreadcrumb: config.children is not a list of XBreadcrumbItem.';
            }
            obj.container = this.el.ol;
            if (i == this.children.length - 1) {
                obj.active = true;
            }
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('breadcrumb', XBreadcrumb);

// XBreadcrumbItem.js

class XBreadcrumbItem extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'text';
        this.url = this.config.url || null;
        this.active = this.config.active || (this.url ? false : true);

        this.el = {};
    }

    render() {
        if (!this.container instanceof XBreadcrumb) {
            throw 'XBreadcrumbItem: config.container is not an instance of XBreadcrumb.';
        }
        this.el.li = document.createElement('li');
        this.el.li.className = 'breadcrumb-item';
        if (this.active) {
            this.el.li.className += ' active';
        }
        if (!this.url) {
            this.el.li.innerHTML = this.text;
        }
        this.container.appendChild(this.el.li);

        if (this.url) {
            this.el.a = document.createElement('a');
            this.el.a.href = this.url;
            this.el.a.innerHTML = this.text;
            this.el.li.appendChild(this.el.a);
        }
    }

}

XType.add('breadcrumbitem', XBreadcrumbItem);

// XButton.js

class XButton extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'Button';
        this.cls = this.config.cls || 'btn-primary';
        this.listeners = this.config.listeners || null;

        this.el = {};
        this.hasRendered = false;
    }

    render() {
        if (this.hasRendered) {
            return;
        }
        this.el.button = document.createElement('button');
        this.el.button.type = 'button';
        this.el.button.innerHTML = this.text;
        this.el.button.className = 'btn ' + this.cls;
        this.container.appendChild(this.el.button);
        new XEvent(this.el.button, this.listeners);

        this.hasRendered = true;
    }

}

XType.add('button', XButton);

// XButtonGroup.js

class XButtonGroup extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || '';
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.group = document.createElement('div');
        this.el.group.className = 'btn-group ' + this.cls;
        this.el.group.role = 'group';
        this.container.appendChild(this.el.group);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            if (!obj instanceof XButton) {
                throw 'XButtonGroup: obj.children is not a list of XButton.';
            }
            obj.container = this.el.group;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });

    }

}

XType.add('buttongroup', XButtonGroup);

