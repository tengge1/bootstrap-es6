// XTR.js

class XTR extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || null;
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.tr = document.createElement('tr');
        if (this.cls) {
            this.el.tr.className = this.cls;
        }
        this.container.appendChild(this.el.tr);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.tr;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('tr', XTR);