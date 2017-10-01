// BListItem

class BListItem extends BObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'This is BListItem.';
        this.prefixHtml = '<li>' + this.text;
        this.suffixHtml = '</li>';
    }

    appendChild(obj) {
        throw Error('BListItem: BListItem doesnot support appendChild.');
    }

    removeChild(obj) {
        throw Error('BListItem: BListItem doesnot support removeChild.');
    }


}