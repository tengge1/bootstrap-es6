// XTH.js

class XTH extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.th = document.createElement('th');
        this.container.appendChild(this.el.th);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.th;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('th', XTH);