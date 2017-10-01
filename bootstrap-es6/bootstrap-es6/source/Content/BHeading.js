// BHeading

class BHeading extends BObject {

    constructor(config) {
        super(config);

        this.title = this.config.title || 'This is BHeading.';
        this.type = this.config.type || BHeadingType.h1;
        this.subtitle = this.config.subtitle || null;
        this.prefixHtml = `<${this.type}>` + this.title;
        this.suffixHtml = `${this.subtitle == null ? '' : ('<small>' + this.subtitle + '</small>')}</${this.type}>`;
    }

    appendChild(obj) {
        throw Error('BHeading: BHeading doesnot support appendChild.');
    }

    removeChild(obj) {
        throw Error('BHeading: BHeading doesnot support removeChild.');
    }

}