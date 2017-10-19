// XCard.js

class XCard extends XObject {

    constructor(config) {
        super(config);
        this.width = this.config.width || 'auto';
        this.height = this.config.height || 'auto';
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.card = document.createElement('div');
        this.el.card.className = 'card';
        this.el.card.style.width = this.width;
        this.el.card.style.height = this.height;
        this.container.appendChild(this.el.card);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.card;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('card', XCard);