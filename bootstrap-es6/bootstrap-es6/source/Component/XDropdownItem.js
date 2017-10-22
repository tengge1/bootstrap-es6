// XDropdownItem.js

class XDropdownItem extends XObject {

    constructor(config) {
        super(config);
        this.divider = this.config.divider || false;
        this.text = this.config.text || 'text';
        this.url = this.config.url || 'javascript:;';
        this.listeners = this.config.listeners || null;

        this.el = {};
    }

    render() {
        if (this.divider) {
            this.el.item = document.createElement('div');
            this.el.item.className = 'dropdown-divider';
        } else {
            this.el.item = document.createElement('a');
            this.el.item.className = 'dropdown-item';
            this.el.item.href = this.url;
            this.el.item.innerHTML = this.text;
            if (this.listeners) {
                new XEvent(this.el.item, this.listeners);
            }
        }
        this.container.appendChild(this.el.item);
    }

}

XType.add('dropdownitem', XDropdownItem);