// XImage.js

class XImage extends XObject {

    constructor(config) {
        super(config);
        this.src = this.config.src || '';
        this.cls = this.config.cls || null;
        this.alt = this.config.alt || null;
        this.width = this.config.width || null;
        this.height = this.config.height || null;

        this.el = {};
    }

    render() {
        this.el.image = document.createElement('img');
        this.el.image.src = this.src;
        if (this.cls) {
            this.el.image.className = this.cls;
        }
        if (this.alt) {
            this.el.image.alt = this.alt;
        }
        if (this.width) {
            this.el.image.style.width = this.width;
        }
        if (this.height) {
            this.el.image.style.height = this.height;
        }
        this.container.appendChild(this.el.image);
    }

}

XType.add('image', XImage);