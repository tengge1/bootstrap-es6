// XNavbar.js

class XNavbar extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || null;
        this.children = this.config.children || [];
    }

    render() {
        this.el.nav = document.createElement('nav');
        this.el.nav.className = 'navbar';
        this.container.appendChild(this.el.nav);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.container;
            obj.render.call(obj);
        });
    }

}

XType.add('navbar', XNavbar);