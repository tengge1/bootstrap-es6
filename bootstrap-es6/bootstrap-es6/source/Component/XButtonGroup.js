// XButtonGroup.js

class XButtonGroup extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.group = document.createElement('div');
        this.el.group.className = 'btn-group';
        this.el.group.role = 'group';
        this.container.appendChild(this.el.group);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            if (!obj instanceof XButton) {
                throw 'XButtonGroup: obj.children is not a list of XButton.';
            }
            obj.container = this.el.group;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });

    }

}

XType.add('buttongroup', XButtonGroup);