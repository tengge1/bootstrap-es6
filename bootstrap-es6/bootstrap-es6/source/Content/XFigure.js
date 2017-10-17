// XFigure.js

class XFigure extends XObject {

    constructor(config) {
        super(config);
        this.src = this.config.src || '';
        this.alt = this.config.alt || null;
        this.title = this.config.title || null;

        this.el = {};
    }

    render() {
        this.el.figure = document.createElement('figure');
        this.el.figure.className = 'figure';
        this.container.appendChild(this.el.figure);

        this.img = document.createElement('img');
        this.img.className = 'figure-img img-fluid rounded';
        this.img.src = this.src;
        if (this.img.alt) {
            this.img.alt = this.alt;
        }
        this.el.figure.appendChild(this.img);

        if (this.title) {
            this.el.figcaption = document.createElement('figcaption');
            this.el.figcaption.className = 'figure-caption';
            this.el.figcaption.innerHTML = this.title;
            this.el.figure.appendChild(this.el.figcaption);
        }
    }

}

XType.add('figure', XFigure);