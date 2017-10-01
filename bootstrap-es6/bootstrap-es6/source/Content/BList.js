// BList

class BList extends BObject {

    constructor(config) {
        super(config);
        this.unstyled = this.config.unstyled || false;
        this.inline = this.config.inline || false;
        if (this.inline) {
            this.prefixHtml = `<ul class="list-inline">`;
        } else if (this.unstyled) {
            this.prefixHtml = `<ul class="list-unstyled">`;
        } else {
            this.prefixHtml = `<ul>`;
        }
        this.suffixHtml = '</ul>';
    }

    appendChild(item) {
        if (!item instanceof BListItem) {
            throw Error('BList: Item is not an instance of BListItem.');
        }
        super.appendChild(item);
    }

    removeChild(item) {
        if (!item instanceof BListItem) {
            throw Error('BList: Item is not an instance of BListItem.');
        }
        super.removeChild(item);
    }

}