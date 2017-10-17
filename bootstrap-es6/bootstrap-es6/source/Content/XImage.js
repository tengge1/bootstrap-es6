// XImage.js

class XImage extends XObject {

    constructor(config) {
        super(config);
        this.src = this.config.src || '';
        this.cls = this.config.cls || null;
        this.alt = this.config.alt || null;

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
        this.container.appendChild(this.el.image);
    }

}

XType.add('image', XImage);