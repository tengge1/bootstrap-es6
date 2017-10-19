// XCardHeader.js

class XCardHeader extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';

        this.el = {};
    }

    render() {
        this.el.header = document.createElement('div');
        this.el.header.className = 'card-header';
        this.el.header.innerHTML = this.html;
        this.container.appendChild(this.el.header);
    }

}

XType.add('cardheader', XCardHeader);