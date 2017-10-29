// XObject.js

class XObject {

    constructor(config) {
        this.config = config || {};
        this.container = this.config.container || document.body;
        this.id = this.config.id || null;
        if (this.id) {
            XCache.add(this.id, this);
        }

        this.el = {};
    }

    render() {

    }

}

XType.add('object', XObject);