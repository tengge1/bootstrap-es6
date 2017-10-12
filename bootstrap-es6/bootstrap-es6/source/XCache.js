// XCache.js

class XCache {

    static get(name) {
        if (name == null) {
            return null;
        }
        var obj = XCache.components[name];
        return obj == undefined ? null : obj;
    }

    static add(name, obj) {
        if (name == null) {
            return;
        }
        if (XCache.components[name] == null) {
            XCache.components[name] = obj;
        }
    }

    static remove(name) {
        delete XCache.components[name];
    }

}

XCache.components = {};