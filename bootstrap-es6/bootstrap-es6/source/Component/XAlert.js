// XAlert.js

class XAlert extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || 'alert-primary';
        this.children = this.config.children || [];

        this.el = {};
        this.hasRendered = false;
    }

    render() {
        if (this.hasRendered) {
            return;
        }
        this.el.alert = document.createElement('div');
        this.el.alert.className = 'alert ' + this.cls;
        this.container.appendChild(this.el.alert);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.alert;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });

        this.hasRendered = true;
    }

}

XType.add('alert', XAlert);