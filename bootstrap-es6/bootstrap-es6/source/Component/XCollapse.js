// XCollapse.js

class XCollapse extends XObject {

    constructor(config) {
        super(config);
        this.id = this.config.id || 'XCollapse' + XCollapse.index;
        this.children = this.config.children || [];

        this.el = {};
        XCollapse.index++;
    }

    render() {
        this.el.collapse = document.createElement('div');
        this.el.collapse.className = 'collapse';
        this.el.collapse.id = this.id;
        this.container.appendChild(this.el.collapse);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.collapse;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XCollapse.index = 0;

XType.add('collapse', XCollapse);