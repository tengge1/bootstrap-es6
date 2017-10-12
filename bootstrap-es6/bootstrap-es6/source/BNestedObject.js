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