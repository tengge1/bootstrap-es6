// XNavbarNavItem.js

class XNavbarNavItem extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || null;
        this.active = this.config.active || false;
        this.children = this.config.children || [];
    }

    render() {
        this.el.item = document.createElement('li');
        this.el.item.className = 'nav-item';
        if (this.cls) {
            this.el.item.className += ' ' + this.cls;
        }
        if (this.active) {
            this.el.item.className += ' active';
        }
        this.container.appendChild(this.el.item);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.item;
            obj.render.call(obj);
        });
    }

}

XType.add('navbarnavitem', XNavbarNavItem);