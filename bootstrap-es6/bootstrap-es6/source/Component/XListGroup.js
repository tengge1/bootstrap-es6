// XListGroup.js

class XListGroup extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.group = document.createElement('ul');
        this.el.group.className = 'list-group';
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