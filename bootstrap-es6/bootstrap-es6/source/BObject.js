// BObject.js

class BObject {

    constructor(config) {
        this.config = config || {};
        this.container = this.config.container || document.body;
        this.alias = 'object';
    }

}