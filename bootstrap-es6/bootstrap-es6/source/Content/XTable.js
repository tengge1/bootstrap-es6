// XTable.js

class XTable extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.table = document.createElement('table');
        this.container.appendChild(this.el.table);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.table;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('table', XTable);