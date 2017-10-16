// XChild.js

class XChild extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.children = document.createElement('div');
        this.container.appendChild(this.el.children);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.children;

            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('child', XChild);