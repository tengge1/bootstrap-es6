// XSelect.js

class XSelect extends XObject {

    constructor(config) {
        super(config);
        this.multiple = this.config.multiple || false;
        this.children = this.config.children || [];
    }

    render() {
        this.el.select = document.createElement('select');
        this.el.select.className = 'form-control';
        if (this.multiple) {
            this.el.select.multiple = 'multiple';
        }
        this.container.appendChild(this.el.select);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.select;
            obj.render.call(obj);
        });
    }

}

XType.add('select', XSelect);