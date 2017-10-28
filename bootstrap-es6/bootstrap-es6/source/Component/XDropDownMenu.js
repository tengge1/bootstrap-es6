// XDropdownMenu.js

class XDropdownMenu extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];
    }

    render() {
        this.el.menu = document.createElement('div');
        this.el.menu.className = 'dropdown-menu';
        this.container.appendChild(this.el.menu);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.menu;
            obj.render.call(obj);
        });
    }

}

XType.add('dropdownmenu', XDropdownMenu);