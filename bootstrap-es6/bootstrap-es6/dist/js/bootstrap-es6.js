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

        this.el = {};
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

// XExample.js

class XExample extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.container = document.createElement('div');
        this.el.container.className = 'container example';
        this.container.appendChild(this.el.container);

        this.el.style = document.createElement('style');
        document.head.appendChild(this.el.style);

        this.el.style.sheet.addRule('.example > *', 'margin: 0.25rem;');

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.container;
            obj.render.call(obj);
        });
    }

}

XType.add('example', XExample);

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
        this.width = this.config.width || null;
        this.height = this.config.height || null;

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
        if (this.width) {
            this.el.image.style.width = this.width;
        }
        if (this.height) {
            this.el.image.style.height = this.height;
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

// XH1.js

class XH1 extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.h1 = document.createElement('h1');
        this.el.h1.innerHTML = this.html;
        if (this.cls) {
            this.el.h1.className = this.cls;
        }
        this.container.appendChild(this.el.h1);
    }

}

XType.add('h1', XH1);

// XH2.js

class XH2 extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.h2 = document.createElement('h2');
        this.el.h2.innerHTML = this.html;
        if (this.cls) {
            this.el.h1.className = this.cls;
        }
        this.container.appendChild(this.el.h2);
    }

}

XType.add('h2', XH2);

// XH3.js

class XH3 extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.h3 = document.createElement('h3');
        this.el.h3.innerHTML = this.html;
        if (this.cls) {
            this.el.h1.className = this.cls;
        }
        this.container.appendChild(this.el.h3);
    }

}

XType.add('h3', XH3);

// XH4.js

class XH4 extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.h4 = document.createElement('h4');
        this.el.h4.innerHTML = this.html;
        if (this.cls) {
            this.el.h1.className = this.cls;
        }
        this.container.appendChild(this.el.h4);
    }

}

XType.add('h4', XH4);

// XH5.js

class XH5 extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.h5 = document.createElement('h5');
        this.el.h5.innerHTML = this.html;
        if (this.cls) {
            this.el.h1.className = this.cls;
        }
        this.container.appendChild(this.el.h5);
    }

}

XType.add('h5', XH5);

// XH6.js

class XH6 extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.h6 = document.createElement('h6');
        this.el.h6.innerHTML = this.html;
        if (this.cls) {
            this.el.h1.className = this.cls;
        }
        this.container.appendChild(this.el.h6);
    }

}

XType.add('h6', XH6);

// XP.js

class XP extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.p = document.createElement('p');
        this.el.p.innerHTML = this.html;
        if (this.cls) {
            this.el.p.className = this.cls;
        }
        this.container.appendChild(this.el.p);
    }

}

XType.add('p', XP);

// XHr.js

class XHr extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.hr = document.createElement('hr');
        if (this.cls) {
            this.el.hr.className = this.cls;
        }
        this.container.appendChild(this.el.hr);
    }

}

XType.add('hr', XHr);

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
        this.type = this.config.type || 'button';
        this.cls = this.config.cls || 'btn-primary';
        this.style = this.config.style || null;
        this.toggle = this.config.toggle || null;
        this.target = this.config.target || null;
        this.dismiss = this.config.dismiss || null;
        this.listeners = this.config.listeners || null;

        this.el = {};
    }

    render() {
        this.el.button = document.createElement('button');
        this.el.button.type = this.type;
        this.el.button.innerHTML = this.text;
        this.el.button.className = 'btn ' + this.cls;
        if (this.style) {
            this.el.button.style = this.style;
        }
        if (this.toggle) {
            this.el.button.setAttribute('data-toggle', this.toggle);
        }
        if (this.target) {
            this.el.button.setAttribute('data-target', this.target);
        }
        if (this.dismiss) {
            this.el.button.setAttribute('data-dismiss', this.dismiss);
        }
        this.container.appendChild(this.el.button);
        new XEvent(this.el.button, this.listeners);
    }

}

XType.add('button', XButton);

// XLinkButton.js

class XLinkButton extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'Button';
        this.cls = this.config.cls || 'btn-primary';
        this.url = this.config.url || '#';
        this.toggle = this.config.toggle || null;
        this.target = this.config.target || null;
        this.listeners = this.config.listeners || null;

        this.el = {};
        this.hasRendered = false;
    }

    render() {
        this.el.a = document.createElement('a');
        this.el.a.innerHTML = this.text;
        this.el.a.className = 'btn ' + this.cls;
        this.el.a.href = this.url;
        if (this.toggle) {
            this.el.a.setAttribute('data-toggle', this.toggle);
        }
        if (this.target) {
            this.url = this.target;
            this.el.a.href = this.url;
        }
        this.container.appendChild(this.el.a);
        new XEvent(this.el.a, this.listeners);
    }

}

XType.add('linkbutton', XLinkButton);

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

// XCard.js

class XCard extends XObject {

    constructor(config) {
        super(config);
        this.width = this.config.width || 'auto';
        this.height = this.config.height || 'auto';
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.card = document.createElement('div');
        this.el.card.className = 'card';
        this.el.card.style.width = this.width;
        this.el.card.style.height = this.height;
        this.container.appendChild(this.el.card);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.card;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('card', XCard);

// XCardImage.js

class XCardImage extends XObject {

    constructor(config) {
        super(config);
        this.src = this.config.src || '';
        this.alt = this.config.alt || null;

        this.el = {};
    }

    render() {
        this.el.img = document.createElement('img');
        this.el.img.className = 'card-img-top';
        this.el.img.src = this.src;
        this.el.img.alt = this.alt;
        this.container.appendChild(this.el.img);
    }

}

XType.add('cardimage', XCardImage);

// XCardBody.js

class XCardBody extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.body = document.createElement('div');
        this.el.body.className = 'card-body';
        this.container.appendChild(this.el.body);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.body;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('cardbody', XCardBody);

// XCardTitle.js

class XCardTitle extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';

        this.el = {};
    }

    render() {
        this.el.title = document.createElement('h4');
        this.el.title.className = 'card-title';
        this.el.title.innerHTML = this.html;
        this.container.appendChild(this.el.title);
    }

}

XType.add('cardtitle', XCardTitle);

// XCardSubTitle.js

class XCardSubTitle extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';

        this.el = {};
    }

    render() {
        this.el.title = document.createElement('h6');
        this.el.title.className = 'card-subtitle mb-2 text-muted';
        this.el.title.innerHTML = this.html;
        this.container.appendChild(this.el.title);
    }

}

XType.add('cardsubtitle', XCardSubTitle);

// XCardText.js

class XCardText extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';

        this.el = {};
    }

    render() {
        this.el.text = document.createElement('p');
        this.el.text.className = 'card-text';
        this.el.text.innerHTML = this.html;
        this.container.appendChild(this.el.text);
    }

}

XType.add('cardtext', XCardText);

// XCardLink.js

class XCardLink extends XObject {

    constructor(config) {
        super(config);

        this.text = this.config.text || 'text';
        this.url = this.config.url || '#';

        this.el = {};
    }

    render() {
        this.el.link = document.createElement('a');
        this.el.link.className = 'card-link';
        this.el.link.innerHTML = this.text;
        this.el.link.href = this.url;
        this.container.appendChild(this.el.link);
    }

}

XType.add('cardlink', XCardLink);

// XCardHeader.js

class XCardHeader extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';

        this.el = {};
    }

    render() {
        this.el.header = document.createElement('div');
        this.el.header.className = 'card-header';
        this.el.header.innerHTML = this.html;
        this.container.appendChild(this.el.header);
    }

}

XType.add('cardheader', XCardHeader);

// XCardFooter.js

class XCardFooter extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';

        this.el = {};
    }

    render() {
        this.el.footer = document.createElement('div');
        this.el.footer.className = 'card-footer';
        this.el.footer.innerHTML = this.html;
        this.container.appendChild(this.el.footer);
    }

}

XType.add('cardfooter', XCardFooter);

// XCarousel.js

class XCarousel extends XObject {

    constructor(config) {
        super(config);
        this.id = this.config.id || ('XCarousel' + XCarousel.index);
        this.width = this.config.width || 'auto';
        this.height = this.config.height || 'auto';
        this.controls = this.config.controls || true;
        this.indicators = this.config.indicators || true;
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.carousel = document.createElement('div');
        this.el.carousel.id = this.id;
        this.el.carousel.className = 'carousel slide';
        this.el.carousel.setAttribute('data-ride', 'carousel');
        this.el.carousel.style.width = this.width;
        this.el.carousel.style.height = this.height;
        this.container.appendChild(this.el.carousel);

        if (this.indicators) {
            this.el.indicator = document.createElement('ol');
            this.el.indicator.className = 'carousel-indicators';
            this.el.carousel.appendChild(this.el.indicator);

            this.el.indicators = [];
            for (var i = 0; i < this.children[0].children.length; i++) {
                this.el.indicators[i] = document.createElement('li');
                this.el.indicators[i].setAttribute('data-target', '#' + this.id);
                this.el.indicators[i].setAttribute('data-slide-to', i);
                if (i == 0) {
                    this.el.indicators[i].className = 'active';
                }
                this.el.indicator.appendChild(this.el.indicators[i]);
            }
        }

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.carousel;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });

        if (this.controls) {
            this.el.prev = document.createElement('a');
            this.el.prev.className = 'carousel-control-prev';
            this.el.prev.href = '#' + this.id;
            this.el.prev.role = 'button';
            this.el.prev.setAttribute('data-slide', 'prev');
            this.el.carousel.appendChild(this.el.prev);

            this.el.prevIcon = document.createElement('span');
            this.el.prevIcon.className = 'carousel-control-prev-icon';
            this.el.prev.appendChild(this.el.prevIcon);

            this.el.next = document.createElement('a');
            this.el.next.className = 'carousel-control-next';
            this.el.next.href = '#' + this.id;
            this.el.next.role = 'button';
            this.el.next.setAttribute('data-slide', 'next');
            this.el.carousel.appendChild(this.el.next);

            this.el.nextIcon = document.createElement('span');
            this.el.nextIcon.className = 'carousel-control-next-icon';
            this.el.next.appendChild(this.el.nextIcon);
        }
    }

}

XCarousel.index = 0;

XType.add('carousel', XCarousel);

// XCarouselInner.js

class XCarouselInner extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.inner = document.createElement('div');
        this.el.inner.className = 'carousel-inner';
        this.container.appendChild(this.el.inner);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.inner;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('carouselinner', XCarouselInner);

// XCarouselItem.js

class XCarouselItem extends XObject {

    constructor(config) {
        super(config);
        this.title = this.config.title || null;
        this.html = this.config.html || null;
        this.active = this.config.active || false;
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.item = document.createElement('div');
        this.el.item.className = 'carousel-item';
        if (this.active) {
            this.el.item.className += ' active';
        }
        this.container.appendChild(this.el.item);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.item;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });

        if (this.title || this.html) {
            this.el.caption = document.createElement('div');
            this.el.caption.className = 'carousel-caption d-none d-md-block';
            this.el.item.appendChild(this.el.caption);
            if (this.title) {
                this.el.title = document.createElement('h3');
                this.el.title.innerHTML = this.title;
                this.el.caption.appendChild(this.el.title);
            }
            if (this.html) {
                this.el.html = document.createElement('p');
                this.el.html.innerHTML = this.html;
                this.el.caption.appendChild(this.el.html);
            }
        }
    }

}

XType.add('carouselitem', XCarouselItem);

// XListGroup.js

class XListGroup extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || '';
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.group = document.createElement('ul');
        this.el.group.className = 'list-group ' + this.cls;
        this.container.appendChild(this.el.group);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.group;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('listgroup', XListGroup);

// XListGroupItem.js

class XListGroupItem extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';

        this.el = {};
    }

    render() {
        this.el.item = document.createElement('li');
        this.el.item.className = 'list-group-item';
        this.el.item.innerHTML = this.html;
        this.container.appendChild(this.el.item);
    }

}

XType.add('listgroupitem', XListGroupItem);

// XCollapse.js

class XCollapse extends XObject {

    constructor(config) {
        super(config);
        this.id = this.config.id || 'XCollapse' + XCollapse.index;
        this.children = this.config.children || [];

        this.el = {};
        XCollapse.index++;
    }

    render() {
        this.el.collapse = document.createElement('div');
        this.el.collapse.className = 'collapse';
        this.el.collapse.id = this.id;
        this.container.appendChild(this.el.collapse);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.collapse;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XCollapse.index = 0;

XType.add('collapse', XCollapse);

// XAccordion.js

class XAccordion extends XObject {

    constructor(config) {
        super(config);
        this.id = this.config.id || `XAccordion${XAccordion.index}`;
        this.children = this.config.children || [];

        this.el = {};
        XAccordion.index++;
    }

    render() {
        this.el.accordion = document.createElement('div');
        this.el.accordion.id = this.id;
        this.el.accordion.role = 'tablist';
        this.container.appendChild(this.el.accordion);

        this.el.items = [];

        this.children.forEach((n, i) => {
            this.el.items[i] = X.create(n);
            this.el.items[i].container = this.el.accordion;
            if (typeof (this.el.items[i].render) == 'function') {
                this.el.items[i].render.call(this.el.items[i]);
            }
        });
    }

}

XAccordion.index = 0;

XType.add('accordion', XAccordion);

// XAccordionItem.js

class XAccordionItem extends XObject {

    constructor(config) {
        super(config);
        this.id = this.config.id || `XAccordionItem${XAccordionItem.index}`;
        this.title = this.config.title || 'title';
        this.active = this.config.active || false;
        this.children = this.config.children || [];

        this.el = {};
        XAccordionItem.index++;
    }

    render() {
        this.el.card = document.createElement('div');
        this.el.card.className = 'card';
        this.container.appendChild(this.el.card);

        this.el.header = document.createElement('div');
        this.el.header.className = 'card-header';
        this.el.header.role = 'tab';
        this.el.card.appendChild(this.el.header);

        this.el.h5 = document.createElement('h5');
        this.el.h5.className = 'mb-0';
        this.el.header.appendChild(this.el.h5);

        this.el.a = document.createElement('a');
        this.el.a.setAttribute('data-toggle', 'collapse');
        this.el.a.href = `#${this.id}`;
        this.el.a.innerHTML = this.title;
        this.el.h5.appendChild(this.el.a);

        this.el.collapse = document.createElement('div');
        this.el.collapse.id = this.id;
        this.el.collapse.className = 'collapse';
        if (this.active) {
            this.el.collapse.className += ' show';
        }
        this.el.collapse.role = 'tabpanel';
        this.el.collapse.setAttribute('data-parent', '#' + this.container.id);
        this.el.card.appendChild(this.el.collapse);

        this.el.body = document.createElement('div');
        this.el.body.className = 'card-body';
        this.el.collapse.appendChild(this.el.body);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.body;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XAccordionItem.index = 0;

XType.add('accordionitem', XAccordionItem);

// XDropdown.js

class XDropdown extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'text';
        this.cls = this.config.cls || '';
        this.btnCls = this.config.btnCls || 'btn-primary';
        this.split = this.config.split || false;
        this.children = this.config.children || [];
        this.listeners = this.config.listeners || null;

        this.el = {};
    }

    render() {
        this.el.dropdown = document.createElement('div');
        this.el.dropdown.className = 'btn-group ' + this.cls;
        this.container.appendChild(this.el.dropdown);

        this.el.button = document.createElement('button');
        this.el.button.type = 'button';
        if (this.split) {
            this.el.button.className = 'btn ' + this.btnCls;
            if (this.listeners) {
                new XEvent(this.el.button, this.listeners);
            }
        } else {
            this.el.button.className = 'btn dropdown-toggle ' + this.btnCls;
            this.el.button.setAttribute('data-toggle', 'dropdown');
        }
        this.el.button.innerHTML = this.text;
        this.el.dropdown.appendChild(this.el.button);

        if (this.split) {
            this.el.splitBtn = document.createElement('button');
            this.el.splitBtn.className = 'btn dropdown-toggle dropdown-toggle-split ' + this.btnCls;
            this.el.splitBtn.setAttribute('data-toggle', 'dropdown');
            this.el.dropdown.appendChild(this.el.splitBtn);
        }

        this.el.menu = document.createElement('div');
        this.el.menu.className = 'dropdown-menu';
        this.el.dropdown.appendChild(this.el.menu);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.menu;
            obj.render.call(obj);
        });
    }

}

XType.add('dropdown', XDropdown);

// XDropdownItem.js

class XDropdownItem extends XObject {

    constructor(config) {
        super(config);
        this.divider = this.config.divider || false;
        this.text = this.config.text || 'text';
        this.url = this.config.url || 'javascript:;';
        this.listeners = this.config.listeners || null;

        this.el = {};
    }

    render() {
        if (this.divider) {
            this.el.item = document.createElement('div');
            this.el.item.className = 'dropdown-divider';
        } else {
            this.el.item = document.createElement('a');
            this.el.item.className = 'dropdown-item';
            this.el.item.href = this.url;
            this.el.item.innerHTML = this.text;
            if (this.listeners) {
                new XEvent(this.el.item, this.listeners);
            }
        }
        this.container.appendChild(this.el.item);
    }

}

XType.add('dropdownitem', XDropdownItem);

// XForm.js

class XForm extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.form = document.createElement('form');
        this.container.appendChild(this.el.form);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.form;
            obj.render.call(obj);
        });
    }

}

XType.add('form', XForm);

// XFormGroup.js

class XFormGroup extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.group = document.createElement('div');
        this.el.group.className = 'form-group';
        this.container.appendChild(this.el.group);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.group;
            obj.render.call(obj);
        });
    }

}

XType.add('formgroup', XFormGroup);

// XLabel.js

class XLabel extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'text';

        this.el = {};
    }

    render() {
        this.el.label = document.createElement('label');
        this.el.label.innerHTML = this.text;
        this.container.appendChild(this.el.label);
    }

}

XType.add('label', XLabel);

// XInput.js

class XInput extends XObject {

    constructor(config) {
        super(config);
        this.type = this.config.type || 'text';
        this.placeholder = this.config.placeholder || null;
    }

    render() {
        this.el.input = document.createElement('input');
        this.el.input.type = this.type;
        this.el.input.className = 'form-control';
        if (this.placeholder) {
            this.el.input.placeholder = this.placeholder;
        }
        this.container.appendChild(this.el.input);
    }

}

XType.add('input', XInput);

// XFormText.js

class XFormText extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text;
    }

    render() {
        this.el.text = document.createElement('small');
        this.el.text.className = 'form-text text-muted';
        this.el.text.innerHTML = this.text;
        this.container.appendChild(this.el.text);
    }

}

XType.add('formtext', XFormText);

// XFormCheck.js

class XFormCheck extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || null;
    }

    render() {
        this.el.check = document.createElement('div');
        this.el.check.className = 'form-check';
        this.container.appendChild(this.el.check);

        this.el.label = document.createElement('label');
        this.el.label.className = 'form-check-label';
        this.el.check.appendChild(this.el.label);

        this.el.input = document.createElement('input');
        this.el.input.type = 'checkbox';
        this.el.input.className = 'form-check-input';
        this.el.label.appendChild(this.el.input);
        if (this.text) {
            this.el.label.append(' ' + this.text);
        }
    }

}

XType.add('formcheck', XFormCheck);

// XSelect.js

class XSelect extends XObject {

    constructor(config) {
        super(config);
        this.multiple = this.config.multiple || false;
        this.children = this.config.children || [];
    }

    render() {
        this.el.select = document.createElement('select');
        this.el.select.className = 'form-control';
        if (this.multiple) {
            this.el.select.multiple = 'multiple';
        }
        this.container.appendChild(this.el.select);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.select;
            obj.render.call(obj);
        });
    }

}

XType.add('select', XSelect);

// XOption.js

class XOption extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'text';
    }

    render() {
        this.el.option = document.createElement('option');
        this.el.option.innerHTML = this.text;
        this.container.appendChild(this.el.option);
    }

}

XType.add('option', XOption);

// XTextarea.js

class XTextarea extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || '';
    }

    render() {
        this.el.textarea = document.createElement('textarea');
        this.el.textarea.className = 'form-control';
        this.el.textarea.innerHTML = this.html;
        this.container.appendChild(this.el.textarea);
    }

}

XType.add('textarea', XTextarea);

// XFile.js

class XFile extends XObject {

    constructor(config) {
        super(config);
    }

    render() {
        this.el.input = document.createElement('input');
        this.el.input.type = 'file';
        this.el.input.className = 'form-control-file';
        this.container.appendChild(this.el.input);
    }

}

XType.add('file', XFile);

// XInputGroup.js

class XInputGroup extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];
    }

    render() {
        this.el.group = document.createElement('div');
        this.el.group.className = 'input-group';
        this.container.appendChild(this.el.group);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.group;
            obj.render.call(obj);
        });
    }

}

XType.add('inputgroup', XInputGroup);

// XInputGroupAddon.js

class XInputGroupAddon extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';
    }

    render() {
        this.el.span = document.createElement('span');
        this.el.span.className = 'input-group-addon';
        this.el.span.innerHTML = this.html;
        this.container.appendChild(this.el.span);
    }

}

XType.add('inputgroupaddon', XInputGroupAddon);

// XJumbotron.js

class XJumbotron extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];
    }

    render() {
        this.el.jumbotron = document.createElement('div');
        this.el.jumbotron.className = 'jumbotron';
        this.container.appendChild(this.el.jumbotron);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.jumbotron;
            obj.render.call(obj);
        });
    }

}

XType.add('jumbotron', XJumbotron);

// XModal.js

class XModal extends XObject {

    constructor(config) {
        super(config);
        this.id = this.config.id || null;
        this.title = this.config.title || 'title';
        this.children = this.config.children || [];
        this.buttons = this.config.buttons || [];
    }

    render() {
        this.el.modal = document.createElement('div');
        this.el.modal.className = 'modal';
        this.el.modal.tabindex = '-1';
        this.el.modal.role = 'dialog';
        if (this.id) {
            this.el.modal.id = this.id;
        }
        this.container.appendChild(this.el.modal);

        this.el.dialog = document.createElement('div');
        this.el.dialog.className = 'modal-dialog';
        this.el.dialog.role = 'document';
        this.el.modal.appendChild(this.el.dialog);

        this.el.content = document.createElement('div');
        this.el.content.className = 'modal-content';
        this.el.dialog.appendChild(this.el.content);

        this.el.header = document.createElement('div');
        this.el.header.className = 'modal-header';
        this.el.content.appendChild(this.el.header);

        this.el.title = document.createElement('h5');
        this.el.title.className = 'modal-title';
        this.el.title.innerHTML = this.title;
        this.el.header.appendChild(this.el.title);

        this.el.closeBtn = document.createElement('button');
        this.el.closeBtn.type = 'button';
        this.el.closeBtn.className = 'close';
        this.el.closeBtn.setAttribute('data-dismiss', 'modal');
        this.el.header.appendChild(this.el.closeBtn);

        this.el.closeIcon = document.createElement('span');
        this.el.closeIcon.innerHTML = '&times;';
        this.el.closeBtn.appendChild(this.el.closeIcon);

        this.el.body = document.createElement('div');
        this.el.body.className = 'modal-body';
        this.el.content.appendChild(this.el.body);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.body;
            obj.render.call(obj);
        });

        this.el.footer = document.createElement('div');
        this.el.footer.className = 'modal-footer';
        this.el.content.appendChild(this.el.footer);

        this.buttons.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.footer;
            obj.render.call(obj);
        });
    }

    show() {

    }

    hide() {

    }

}

XType.add('modal', XModal);

