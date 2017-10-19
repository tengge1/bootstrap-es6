// XCarouselItem.js

class XCarouselItem extends XObject {

    constructor(config) {
        super(config);
        this.active = this.config.active || false;
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.item = document.createElement('div');
        this.el.item.className = 'carousel-item';
        if (this.active) {
            this.el.item.className += ' active';
        }
        this.container.appendChild(this.el.item);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.item;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('carouselitem', XCarouselItem);