// XOption.js

class XOption extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'text';
    }

    render() {
        this.el.option = document.createElement('option');
        this.el.option.innerHTML = this.text;
        this.container.appendChild(this.el.option);
    }

}

XType.add('option', XOption);