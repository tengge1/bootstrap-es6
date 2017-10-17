// XTBody.js

class XTBody extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.tbody = document.createElement('tbody');
        this.container.appendChild(this.el.tbody);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.tbody;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('tbody', XTBody);