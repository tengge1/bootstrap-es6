// XForm.js

class XForm extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.form = document.createElement('form');
        this.container.appendChild(this.el.form);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.form;
            obj.render.call(obj);
        });
    }

}

XType.add('form', XForm);