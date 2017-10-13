// XHtml

class XHtml extends XObject {

    constructor(config) {
        super(config);
        if (this.container == document.body) {
            throw Error('XHtml: container cannot be document.body.');
        }
        this.html = this.config.html || 'This is XHtml.';

        this.el = {};
        this.hasRendered = false;
    }

    render() {
        if (this.hasRendered) {
            return;
        }
        this.container.innerHTML = this.html;
        this.hasRendered = true;
    }

}
XType.add('html', XHtml);