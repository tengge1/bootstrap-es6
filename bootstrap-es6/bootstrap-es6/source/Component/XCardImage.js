// XCardImage.js

class XCardImage extends XObject {

    constructor(config) {
        super(config);
        this.src = this.config.src || '';
        this.alt = this.config.alt || null;

        this.el = {};
    }

    render() {
        this.el.img = document.createElement('img');
        this.el.img.className = 'card-img-top';
        this.el.img.src = this.src;
        this.el.img.alt = this.alt;
        this.container.appendChild(this.el.img);
    }

}

XType.add('cardimage', XCardImage);