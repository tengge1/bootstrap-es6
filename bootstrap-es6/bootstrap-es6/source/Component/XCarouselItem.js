// XCarouselItem.js

class XCarouselItem extends XObject {

    constructor(config) {
        super(config);
        this.title = this.config.title || null;
        this.html = this.config.html || null;
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

        if (this.title || this.html) {
            this.el.caption = document.createElement('div');
            this.el.caption.className = 'carousel-caption d-none d-md-block';
            this.el.item.appendChild(this.el.caption);
            if (this.title) {
                this.el.title = document.createElement('h3');
                this.el.title.innerHTML = this.title;
                this.el.caption.appendChild(this.el.title);
            }
            if (this.html) {
                this.el.html = document.createElement('p');
                this.el.html.innerHTML = this.html;
                this.el.caption.appendChild(this.el.html);
            }
        }
    }

}

XType.add('carouselitem', XCarouselItem);