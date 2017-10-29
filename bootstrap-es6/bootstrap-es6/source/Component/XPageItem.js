// XPageItem.js

class XPageItem extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'text';
        this.url = this.config.url || '#';
        this.active = this.config.active || false;
    }

    render() {
        this.el.item = document.createElement('li');
        this.el.item.className = 'page-item';
        if (this.active) {
            this.el.item.className += ' active';
        }
        this.container.appendChild(this.el.item);

        this.el.link = document.createElement('a');
        this.el.link.className = 'page-link';
        this.el.link.href = this.url;
        this.el.link.innerHTML = this.text;
        this.el.item.appendChild(this.el.link);
    }

}

XType.add('pageitem', XPageItem);