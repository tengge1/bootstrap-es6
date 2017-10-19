// XCardFooter.js

class XCardFooter extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';

        this.el = {};
    }

    render() {
        this.el.footer = document.createElement('div');
        this.el.footer.className = 'card-footer';
        this.el.footer.innerHTML = this.html;
        this.container.appendChild(this.el.footer);
    }

}

XType.add('cardfooter', XCardFooter);