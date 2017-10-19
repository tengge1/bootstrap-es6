// XCardSubTitle.js

class XCardSubTitle extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';

        this.el = {};
    }

    render() {
        this.el.title = document.createElement('h6');
        this.el.title.className = 'card-subtitle mb-2 text-muted';
        this.el.title.innerHTML = this.html;
        this.container.appendChild(this.el.title);
    }

}

XType.add('cardsubtitle', XCardSubTitle);