// XCardBody.js

class XCardBody extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.body = document.createElement('div');
        this.el.body.className = 'card-body';
        this.container.appendChild(this.el.body);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.body;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('cardbody', XCardBody);