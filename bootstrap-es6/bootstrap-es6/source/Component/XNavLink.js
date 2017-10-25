// XNavLink.js

class XNavLink extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || null;
        this.url = this.config.url || '#';
        this.text = this.config.text || 'text';
    }

    render() {
        this.el.link = document.createElement('a');
        this.el.link.className = 'nav-link';
        if (this.cls) {
            this.el.link.className += ' ' + this.cls;
        }
        this.el.link.href = this.url;
        this.el.link.innerHTML = this.text;
        this.container.appendChild(this.el.link);
    }

}

XType.add('navlink', XNavLink);