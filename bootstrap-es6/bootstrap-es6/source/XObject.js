// XObject.js

class XObject {

    constructor(config) {
        this.config = config || {};
        this.container = this.config.container || null;
    }

    render() {

    }

}
XType.add('object', XObject);