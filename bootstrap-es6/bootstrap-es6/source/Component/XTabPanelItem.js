// XTabPanelItem.js

class XTabPanelItem extends XObject {

    constructor(config) {
        super(config);
        this.nav = this.config.nav || null;
        this.title = this.config.title || 'title';
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.navitem = document.createElement('li');
        this.el.navitem.className = 'nav-item';
        this.el.nav.appendChild(this.el.navitem);


    }

}