// XCardText.js

class XCardText extends XObject {

    constructor(config) {
        super(config);

        this.el = {};
    }

    render() {
        this.el.text = document.createElement('p');
        this.el.text.className = 'card-text';
        this.container.appendChild(this.el.text);
    }

}

XType.add('cardtext', XCardText);