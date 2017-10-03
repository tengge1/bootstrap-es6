// BImage

class BImage extends BObject {

    constructor(config) {
        super(config);

        this.src = this.config.src || null;
        this.alt = this.config.alt || null;
        this.responsive = this.config.responsive || false;
        this.rounded = this.config.rounded || false;
        this.circle = this.config.circle || false;
        this.thumbnail = this.config.thumbnail || false;

        if (this.src == null) {
            throw Error('BImage: Config.src is undefined.');
        }

        this.prefixHtml = `<img src="${this.src}" ${this.alt == null ? '' : ('alt="' + this.alt + '"')} class="${this.responsive ? 'img-responsive' : ''} ${this.rounded ? 'img-rounded' : ''} ${this.circle ? 'img-circle' : ''} ${this.thumbnail ? 'img-thumbnail' : ''}" />`;
        this.suffixHtml = '';
    }

}