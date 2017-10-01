// BMedia

class BMedia extends BObject {

    constructor(config) {
        super(config);
        this.img = this.config.img || null;
        this.imgAlign = this.config.imgAlign || BMediaImageAlign.top;
        this.imgAlt = this.config.imgAlt || null;
        this.href = this.config.href || null;
        this.title = this.config.title || null;
        if (this.img == null) {
            throw Error('BMedia: Config.img is undefined.');
        }
        this.prefixHtml = `
            <div class ="media">
                <div class ="media-left ${this.imgAlign}">
                    <a href="${this.href == null ? 'javascript:;' : this.href}">
                        <img class ="media-object" src="${this.img}" ${this.imgAlt == null ? '' : ('alt="' + this.imgAlt + '"')} >
                    </a>
                </div>
                <div class="media-body">
                    <h4 class ="media-heading">${this.title}</h4>`;
        this.suffixHtml = `
                </div>
            </div>`;
    }
}