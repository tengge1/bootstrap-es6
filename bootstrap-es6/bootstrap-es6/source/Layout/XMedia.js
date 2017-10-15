// XMedia.js

class XMedia extends XObject {

    constructor(config) {
        super(config);
        this.imgSrc = this.config.imgSrc || null;
        this.imgAlt = this.config.imgAlt || null;
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        if (this.imgSrc == null) {
            throw 'XMedia: config.imgSrc is undefined.';
        }

        this.el.media = document.createElement('div');
        this.el.media.className = 'media';
        this.container.appendChild(this.el.media);

        this.el.img = document.createElement('img');
        this.el.img.className = 'd-flex mr-3';
        this.el.img.src = this.imgSrc;
        this.el.img.alt = this.imgAlt;
        this.el.media.appendChild(this.el.img);

        this.el.mediaBody = document.createElement('div');
        this.el.mediaBody.className = 'media-body';
        this.el.media.appendChild(this.el.mediaBody);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.mediaBody;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('media', XMedia);
