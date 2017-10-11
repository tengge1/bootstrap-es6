// BObject.js

class BObject {

    constructor(config) {
        this.config = config || {};
        this.container = this.config.container || document.body;
        this.alias = 'object';
        this.children = [];
    }

    appendChild(obj) {

    }

    removeChild(obj) {

    }

    render() {
        this.children.forEach(n => {
            if (typeof (n.render) == 'function') {
                n.render();
            }
        });
    }

}