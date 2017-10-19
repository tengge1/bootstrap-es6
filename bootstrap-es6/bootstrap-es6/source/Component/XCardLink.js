// XCardLink.js

class XCardLink extends XObject {

    constructor(config) {
        super(config);

        this.text = this.config.text || 'text';
        this.url = this.config.url || '#';

        this.el = {};
    }

    render() {
        this.el.link = document.createElement('a');
        this.el.link.className = 'card-link';
        this.el.link.innerHTML = this.text;
        this.el.link.href = this.url;
        this.container.appendChild(this.el.link);
    }

}

XType.add('cardlink', XCardLink);