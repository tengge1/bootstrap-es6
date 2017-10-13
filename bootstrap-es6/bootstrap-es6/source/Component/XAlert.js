// XAlert.js

class XAlert extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || 'alert-primary';
        this.closable = this.config.closable || true;
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
        this.el.alert.role = 'alert';
        this.container.appendChild(this.el.alert);

        if (this.closable) {
            this.el.closeBtn = document.createElement('button');
            this.el.closeBtn.type = 'button';
            this.el.closeBtn.className = 'close';
            this.el.closeBtn.setAttribute('data-dismiss', 'alert');
            this.el.alert.appendChild(this.el.closeBtn);

            this.el.closeIcon = document.createElement('span');
            this.el.closeIcon.innerHTML = '&times;';
            this.el.closeBtn.appendChild(this.el.closeIcon);
        }

        this.el.alertBody = document.createElement('div');
        this.el.alertBody.className = 'alert-body';
        this.el.alert.appendChild(this.el.alertBody);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.alertBody;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });

        this.hasRendered = true;
    }

}

XType.add('alert', XAlert);