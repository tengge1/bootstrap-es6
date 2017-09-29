// BHtml

class BHtml extends BObject {

    constructor(container) {
        super(container);
        this.html = 'This is raw html.';
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