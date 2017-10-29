// XPagination.js

class XPagination extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];
    }

    render() {
        this.el.nav = document.createElement('nav');
        this.container.appendChild(this.el.nav);

        this.el.pagination = document.createElement('ul');
        this.el.pagination.className = 'pagination';
        this.el.nav.appendChild(this.el.pagination);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.pagination;
            obj.render.call(obj);
        });
    }

}

XType.add('pagination', XPagination);