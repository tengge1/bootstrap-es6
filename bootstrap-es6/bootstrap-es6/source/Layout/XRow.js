// XRow.js

class XRow extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.row = document.createElement('div');
        this.el.row.className = 'row';
        this.container.appendChild(this.el.row);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.row;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('row', XRow);