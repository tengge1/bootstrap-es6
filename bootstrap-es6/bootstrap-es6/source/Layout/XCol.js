// XCol.js

class XCol extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || 'col';
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.col = document.createElement('div');
        this.el.col.className = this.cls;
        this.container.appendChild(this.el.col);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.col;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('col', XCol);