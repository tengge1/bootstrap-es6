// XTabPanelItem.js

class XTabPanelItem extends XObject {

    constructor(config) {
        super(config);
        this.nav = this.config.nav || null;
        this.title = this.config.title || 'title';
        this.children = this.config.children || [];
        this.active = this.config.active || false;
    }

    render() {
        this.el.navitem = document.createElement('li');
        this.el.navitem.className = 'nav-item';
        this.nav.appendChild(this.el.navitem);

        this.el.navlink = document.createElement('a');
        this.el.navlink.className = 'nav-link';
        if (this.active) {
            this.el.navlink.className += ' active';
        }
        this.el.navlink.setAttribute('data-toggle', 'tab');
        this.el.navlink.href = `#navlink${XTabPanelItem.index}`;
        this.el.navlink.setAttribute('role', 'tab');
        this.el.navlink.innerHTML = this.title;
        this.el.navitem.appendChild(this.el.navlink);

        this.el.content = document.createElement('div');
        this.el.content.className = 'tab-pane fade';
        if (this.active) {
            this.el.content.className += ' show active';
        }
        this.el.content.id = `navlink${XTabPanelItem.index}`;
        this.el.content.setAttribute('role', 'tabpanel');
        this.container.appendChild(this.el.content);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.content;
            obj.render.call(obj);
        });

        XTabPanelItem.index++;
    }

}

XTabPanelItem.index = 0;

XType.add('tabpanelitem', XTabPanelItem);