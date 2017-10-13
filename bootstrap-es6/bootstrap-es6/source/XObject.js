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