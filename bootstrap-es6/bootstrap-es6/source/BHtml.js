// BHtml

class BHtml extends BObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'This is raw html.';
    }

    setHtml(html) {
        this.html = html;
    }

    getHtml() {
        return this.html;
    }

    appendChild(obj) {
        throw Error('BHtml: BHtml does not support appendChild.');
    }

    removeChild(obj) {
        throw Error('BHtml: BHtml does not support removeChild.');
    }

    toHtml() {
        return this.html;
    }
}