// XTHead.js

class XTHead extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.thead = document.createElement('thead');
        this.container.appendChild(this.el.thead);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.thead;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });

    }

}

XType.add('thead', XTHead);
