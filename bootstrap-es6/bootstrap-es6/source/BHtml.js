// BHtml

class BHtml extends BObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'This is raw html.';
        this.alias = 'html';
    }

    setHtml(html) {
        this.html = html;
        this.container.innerHTML += this.html;
    }

    getHtml() {
        return this.html;
    }

}