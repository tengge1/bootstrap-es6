// XCarousel.js

class XCarousel extends XObject {

    constructor(config) {
        super(config);
        this.id = this.config.id || ('XCarousel' + XCarousel.index);
        this.width = this.config.width || 'auto';
        this.height = this.config.height || 'auto';
        this.controls = this.config.controls || true;
        this.indicators = this.config.indicators || true;
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.carousel = document.createElement('div');
        this.el.carousel.id = this.id;
        this.el.carousel.className = 'carousel slide';
        this.el.carousel.setAttribute('data-ride', 'carousel');
        this.el.carousel.style.width = this.width;
        this.el.carousel.style.height = this.height;
        this.container.appendChild(this.el.carousel);

        if (this.indicators) {
            this.el.indicator = document.createElement('ol');
            this.el.indicator.className = 'carousel-indicators';
            this.el.carousel.appendChild(this.el.indicator);

            this.el.indicators = [];
            for (var i = 0; i < this.children[0].children.length; i++) {
                this.el.indicators[i] = document.createElement('li');
                this.el.indicators[i].setAttribute('data-target', '#' + this.id);
                this.el.indicators[i].setAttribute('data-slide-to', i);
                if (i == 0) {
                    this.el.indicators[i].className = 'active';
                }
                this.el.indicator.appendChild(this.el.indicators[i]);
            }
        }

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.carousel;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });

        if (this.controls) {
            this.el.prev = document.createElement('a');
            this.el.prev.className = 'carousel-control-prev';
            this.el.prev.href = '#' + this.id;
            this.el.prev.role = 'button';
            this.el.prev.setAttribute('data-slide', 'prev');
            this.el.carousel.appendChild(this.el.prev);

            this.el.prevIcon = document.createElement('span');
            this.el.prevIcon.className = 'carousel-control-prev-icon';
            this.el.prev.appendChild(this.el.prevIcon);

            this.el.next = document.createElement('a');
            this.el.next.className = 'carousel-control-next';
            this.el.next.href = '#' + this.id;
            this.el.next.role = 'button';
            this.el.next.setAttribute('data-slide', 'next');
            this.el.carousel.appendChild(this.el.next);

            this.el.nextIcon = document.createElement('span');
            this.el.nextIcon.className = 'carousel-control-next-icon';
            this.el.next.appendChild(this.el.nextIcon);
        }
    }

}

XCarousel.index = 0;

XType.add('carousel', XCarousel);