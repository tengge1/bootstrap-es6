// XList.js

class XList extends XObject {

    constructor(config) {
        super(config);
        this.unstyled = this.config.unstyled || false;
        this.inline = this.config.inline || false;
        this.tagName = this.config.tagName || 'ul';
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.list = document.createElement(this.tagName);
        if (this.inline) {
            this.el.list.className = 'list-inline';
        } else if (this.unstyled) {
            this.el.list.className = 'list-unstyled';
        }
        this.container.appendChild(this.el.list);

        this.el.li = [];

        this.children.forEach((n, i) => {
            this.el.li[i] = document.createElement('li');
            if (this.inline) {
                this.el.li[i].className = 'list-inline-item';
            }
            this.el.list.appendChild(this.el.li[i]);

            var obj = X.create(n);
            obj.container = this.el.li[i];
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('list', XList);