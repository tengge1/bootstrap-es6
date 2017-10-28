// XNavbarBrand.js

class XNavbarBrand extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'text';
        this.url = this.config.url || '#';
    }

    render() {
        this.el.brand = document.createElement('a');
        this.el.brand.className = 'navbar-brand';
        this.el.brand.href = this.url;
        this.el.brand.innerHTML = this.text;
        this.container.appendChild(this.el.brand);
    }

}

XType.add('navbarbrand', XNavbarBrand);