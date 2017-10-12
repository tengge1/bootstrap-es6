// BXType.js

class BXType {

    constructor() {
        this.xtypes = {
            'object': BObject,
            'nestedobject': BNestedObject
        };
    }

    get(config) {
        if (!config.hasOwnProperty('xtype')) {
            throw Error('BXType: config has no attribute xtype.');
        }
        return new this.xtypes[config.xtype](config);
    }

}