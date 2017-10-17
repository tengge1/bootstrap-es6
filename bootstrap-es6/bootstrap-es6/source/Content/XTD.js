// XTD.js

class XTD extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.td = document.createElement('td');
        this.container.appendChild(this.el.td);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.td;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('td', XTD);