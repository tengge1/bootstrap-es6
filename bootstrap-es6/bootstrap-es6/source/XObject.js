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