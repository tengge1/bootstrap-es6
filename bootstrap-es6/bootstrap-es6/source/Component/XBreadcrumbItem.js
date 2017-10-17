// XBreadcrumbItem.js

class XBreadcrumbItem extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'text';
        this.url = this.config.url || null;
        this.active = this.config.active || (this.url ? false : true);

        this.el = {};
    }

    render() {
        if (!this.container instanceof XBreadcrumb) {
            throw 'XBreadcrumbItem: config.container is not an instance of XBreadcrumb.';
        }
        this.el.li = document.createElement('li');
        this.el.li.className = 'breadcrumb-item';
        if (this.active) {
            this.el.li.className += ' active';
        }
        if (!this.url) {
            this.el.li.innerHTML = this.text;
        }
        this.container.appendChild(this.el.li);

        if (this.url) {
            this.el.a = document.createElement('a');
            this.el.a.href = this.url;
            this.el.a.innerHTML = this.text;
            this.el.li.appendChild(this.el.a);
        }
    }

}

XType.add('breadcrumbitem', XBreadcrumbItem);