// XListGroup.js

class XListGroup extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.ul = document.createElement('ul');
        this.el.ul.className = 'list-group list-group-flush';
        this.container.appendChild(this.el.ul);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.ul;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('listgroup', XListGroup);