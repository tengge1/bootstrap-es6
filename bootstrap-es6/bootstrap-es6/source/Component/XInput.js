// XInput.js

class XInput extends XObject {

    constructor(config) {
        super(config);
        this.type = this.config.type || 'text';
        this.placeholder = this.config.placeholder || null;
    }

    render() {
        this.el.input = document.createElement('input');
        this.el.input.type = this.type;
        this.el.input.className = 'form-control';
        if (this.placeholder) {
            this.el.input.placeholder = this.placeholder;
        }
        this.container.appendChild(this.el.input);
    }

}

XType.add('input', XInput);