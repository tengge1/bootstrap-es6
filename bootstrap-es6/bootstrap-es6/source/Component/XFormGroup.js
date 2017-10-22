// XFormGroup.js

class XFormGroup extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.group = document.createElement('div');
        this.el.group.className = 'form-group';
        this.container.appendChild(this.el.group);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.group;
            obj.render.call(obj);
        });
    }

}

XType.add('formgroup', XFormGroup);