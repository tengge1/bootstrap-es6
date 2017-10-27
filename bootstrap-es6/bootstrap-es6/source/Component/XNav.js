// XNav.js

class XNav extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || null;
        this.children = this.config.children || [];
    }

    render() {
        this.el.nav = document.createElement('nav');
        this.el.nav.className = 'nav';
        if (this.cls) {
            this.el.nav.className += ' ' + this.cls;
        }
        this.container.appendChild(this.el.nav);
        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.nav;
            obj.render.call(obj);
        });
    }

}

XType.add('nav', XNav);