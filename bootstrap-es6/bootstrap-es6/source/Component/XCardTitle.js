// XCardTitle.js

class XCardTitle extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';

        this.el = {};
    }

    render() {
        this.el.title = document.createElement('h4');
        this.el.title.className = 'card-title';
        this.el.title.innerHTML = this.html;
        this.container.appendChild(this.el.title);
    }

}

XType.add('cardtitle', XCardTitle);