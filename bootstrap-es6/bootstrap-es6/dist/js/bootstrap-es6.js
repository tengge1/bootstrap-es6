// BObject.js

class BObject {

    constructor(config) {
        this.config = config || {};
        this.container = this.config.container || null;
        this.alias = 'object';
    }

    render() {

    }

}

// BNestedObject.js

class BNestedObject extends BObject {

    constructor(config) {
        super(config);
        this.alias = 'nestedobject';
        this.children = [];
    }

    appendChild(obj) {
        if (!obj instanceof BNestedObject) {
            throw Error('BNestedObject: obj is not an instance of BNestedObject.');
        }
        this.children.push(obj);
    }

    removeChild(obj) {
        if (!obj instanceof BNestedObject) {
            throw Error('BNestedObject: obj is not an instance of BNestedObject.');
        }
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            if (child == obj) {
                this.children.splice(i);
                i--;
            }
        }
    }

    render() {
        this.children.forEach(n => {
            if (typeof (n.render) == 'function') {
                n.render();
            }
        });
    }
}

// BHtml

class BHtml extends BObject {

    constructor(config) {
        super(config);
        if (this.container == document.body) {
            throw Error('BHtml: container cannot be document.body.');
        }

        this.html = this.config.html || 'This is raw html.';
        this.alias = 'html';
    }

    setHtml(html) {
        this.html = html;
    }

    getHtml() {
        return this.html;
    }

    render() {
        this.container.innerHTML += this.html;
    }

}
