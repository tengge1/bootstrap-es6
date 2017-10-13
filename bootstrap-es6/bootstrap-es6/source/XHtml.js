// XHtml

class XHtml extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'This is XHtml.';

        this.el = {};
        this.hasRendered = false;
    }

    render() {
        if (this.hasRendered) {
            return;
        }
        if (this.container == document.body) {
            throw 'XHtml: container cannot be document.body.';
        }
        this.container.innerHTML = this.html;
        this.hasRendered = true;
    }

}

XType.add('html', XHtml);