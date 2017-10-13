// X.js

class X {

    static create(config) {
        if (config == null || config.xtype == null) {
            throw 'X: config or config.xtype is undefined';
        }
        return XType.get(config);
    }

    static get(name) {
        return XCache.get(name);
    }

}