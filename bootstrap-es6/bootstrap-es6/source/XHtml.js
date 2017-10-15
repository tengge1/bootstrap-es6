// XHtml

class XHtml extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'This is XHtml.';

        this.el = {};
    }

    render() {
        this.el.html = document.createElement('div');
        this.el.html.innerHTML = this.html;
        this.container.appendChild(this.el.html);
    }

}

XType.add('html', XHtml);