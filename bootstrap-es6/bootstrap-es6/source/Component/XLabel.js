// XLabel.js

class XLabel extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'text';

        this.el = {};
    }

    render() {
        this.el.label = document.createElement('label');
        this.el.label.innerHTML = this.text;
        this.container.appendChild(this.el.label);
    }

}

XType.add('label', XLabel);