// BHtml

class BHtml extends BObject {

    constructor(config) {
        super(config);
        if (this.container == document.body) {
            throw Error('BHtml: container cannot be document.body.');
        }

        this.html = this.config.html || 'This is raw html.';
        this.alias = 'html';
    }

    setHtml(html) {
        this.html = html;
    }

    getHtml() {
        return this.html;
    }

    render() {
        this.container.innerHTML += this.html;
    }

}