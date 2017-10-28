// XNavbarToggler.js

class XNavbarToggler extends XObject {

    constructor(config) {
        super(config);
        this.target = this.config.target || '#';
    }

    render() {
        this.el.button = document.createElement('button');
        this.el.button.className = 'navbar-toggler';
        this.el.button.type = 'button';
        this.el.button.setAttribute('data-toggle', 'collapse');
        this.el.button.setAttribute('data-target', this.target);
        this.container.appendChild(this.el.button);

        this.el.icon = document.createElement('span');
        this.el.icon.className = 'navbar-toggler-icon';
        this.el.button.appendChild(this.el.icon);
    }

}

XType.add('navbartoggler', XNavbarToggler);