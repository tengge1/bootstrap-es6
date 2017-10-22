// XInputGroup.js

class XInputGroup extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];
    }

    render() {
        this.el.group = document.createElement('div');
        this.el.group.className = 'input-group';
        this.container.appendChild(this.el.group);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.group;
            obj.render.call(obj);
        });
    }

}

XType.add('inputgroup', XInputGroup);