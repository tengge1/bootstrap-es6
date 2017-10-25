// XNavItem.js

class XNavItem extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];
    }

    render() {
        this.el.item = document.createElement('li');
        this.el.item.className = 'nav-item';
        this.container.appendChild(this.el.item);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.item;
            obj.render.call(obj);
        });
    }

}

XType.add('navitem', XNavItem);