// XBreadcrumb.js

class XBreadcrumb extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.ol = document.createElement('ol');
        this.el.ol.className = 'breadcrumb';
        this.container.appendChild(this.el.ol);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            if (!obj instanceof XBreadcrumbItem) {
                throw 'XBreadcrumb: config.children is not a list of XBreadcrumbItem.';
            }
            obj.container = this.el.ol;
            if (i == this.children.length - 1) {
                obj.active = true;
            }
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('breadcrumb', XBreadcrumb);