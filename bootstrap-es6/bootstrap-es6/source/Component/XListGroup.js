// XListGroup.js

class XListGroup extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || '';
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.group = document.createElement('ul');
        this.el.group.className = 'list-group ' + this.cls;
        this.container.appendChild(this.el.group);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.group;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('listgroup', XListGroup);