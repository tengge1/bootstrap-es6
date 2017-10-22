// XTabPanel.js

class XTabPanel extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.tabs = document.createElement('div');
        this.el.tabs.className = 'card';
        this.container.appendChild(this.el.tabs);

        this.el.header = document.createElement('div');
        this.el.header.className = 'card-header';
        this.el.tabs.appendChild(this.el.header);

        this.el.nav = document.createElement('ul');
        this.el.nav.className = 'nav nav-tabs card-header-tabs';
        this.el.header.appendChild(this.el.nav);

        this.el.body = document.createElement('div');
        this.el.body.className = 'card-body';
        this.el.tabs.appendChild(this.el.body);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.nav = this.el.nav;
            obj.container = this.el.body;
            obj.render.call(obj);
        });
    }

}

XType.add('tabpanel', XTabPanel);