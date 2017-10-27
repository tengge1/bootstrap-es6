// XTabPanel.js

class XTabPanel extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];
    }

    render() {
        this.el.nav = document.createElement('ul');
        this.el.nav.className = 'nav nav-tabs';
        this.el.nav.role = 'tablist';
        this.container.appendChild(this.el.nav);

        this.el.content = document.createElement('div');
        this.el.content.className = 'tab-content';
        this.container.appendChild(this.el.content);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.nav = this.el.nav;
            obj.container = this.el.content;
            obj.render.call(obj);
        });
    }

}

XType.add('tabpanel', XTabPanel);