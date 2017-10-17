// XTable.js

class XTable extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];
        this.dark = this.config.dark || false;
        this.striped = this.config.striped || false;
        this.bordered = this.config.bordered || false;
        this.hover = this.config.hover || false;
        this.sm = this.config.sm || false;

        this.el = {};
    }

    render() {
        this.el.table = document.createElement('table');
        this.el.table.className = 'table';
        if (this.dark) {
            this.el.table.className += ' table-dark';
        }
        if (this.striped) {
            this.el.table.className += ' table-striped';
        }
        if (this.bordered) {
            this.el.table.className += ' table-bordered';
        }
        if (this.hover) {
            this.el.table.className += ' table-hover';
        }
        if (this.sm) {
            this.el.table.className += ' table-sm';
        }
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