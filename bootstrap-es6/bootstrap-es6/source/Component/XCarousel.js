// XCarousel.js

class XCarousel extends XObject {

    constructor(config) {
        super(config);
        this.width = this.config.width || 'auto';
        this.height = this.config.height || 'auto';
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.carousel = document.createElement('div');
        this.el.carousel.className = 'carousel slide';
        this.el.carousel.setAttribute('data-ride', 'carousel');
        this.el.carousel.style.width = this.width;
        this.el.carousel.style.height = this.height;
        this.container.appendChild(this.el.carousel);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.carousel;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('carousel', XCarousel);