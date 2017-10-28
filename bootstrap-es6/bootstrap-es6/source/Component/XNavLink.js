// XNavLink.js

class XNavLink extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || null;
        this.url = this.config.url || '#';
        this.text = this.config.text || 'text';
        this.toggle = this.config.toggle || '';
    }

    render() {
        this.el.link = document.createElement('a');
        this.el.link.className = 'nav-link';
        if (this.cls) {
            this.el.link.className += ' ' + this.cls;
        }
        this.el.link.setAttribute('role', 'button');
        this.el.link.href = this.url;
        this.el.link.innerHTML = this.text;
        if (this.toggle != '') {
            this.el.link.setAttribute('data-toggle', this.toggle);
        }
        this.container.appendChild(this.el.link);
    }

}

XType.add('navlink', XNavLink);