// XDropdown.js

class XDropdown extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'text';
        this.cls = this.config.cls || '';
        this.btnCls = this.config.btnCls || 'btn-primary';
        this.split = this.config.split || false;
        this.children = this.config.children || [];
        this.listeners = this.config.listeners || null;

        this.el = {};
    }

    render() {
        this.el.dropdown = document.createElement('div');
        this.el.dropdown.className = 'btn-group ' + this.cls;
        this.container.appendChild(this.el.dropdown);

        this.el.button = document.createElement('button');
        this.el.button.type = 'button';
        if (this.split) {
            this.el.button.className = 'btn ' + this.btnCls;
            if (this.listeners) {
                new XEvent(this.el.button, this.listeners);
            }
        } else {
            this.el.button.className = 'btn dropdown-toggle ' + this.btnCls;
            this.el.button.setAttribute('data-toggle', 'dropdown');
        }
        this.el.button.innerHTML = this.text;
        this.el.dropdown.appendChild(this.el.button);

        if (this.split) {
            this.el.splitBtn = document.createElement('button');
            this.el.splitBtn.className = 'btn dropdown-toggle dropdown-toggle-split ' + this.btnCls;
            this.el.splitBtn.setAttribute('data-toggle', 'dropdown');
            this.el.dropdown.appendChild(this.el.splitBtn);
        }

        this.el.menu = document.createElement('div');
        this.el.menu.className = 'dropdown-menu';
        this.el.dropdown.appendChild(this.el.menu);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.menu;
            obj.render.call(obj);
        });
    }

}

XType.add('dropdown', XDropdown);