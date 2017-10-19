// XCarouselInner.js

class XCarouselInner extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.inner = document.createElement('div');
        this.el.inner.className = 'carousel-inner';
        this.container.appendChild(this.el.inner);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.inner;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('carouselinner', XCarouselInner);