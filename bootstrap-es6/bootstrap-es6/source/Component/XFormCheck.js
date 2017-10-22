// XFormCheck.js

class XFormCheck extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || null;
    }

    render() {
        this.el.check = document.createElement('div');
        this.el.check.className = 'form-check';
        this.container.appendChild(this.el.check);

        this.el.label = document.createElement('label');
        this.el.label.className = 'form-check-label';
        this.el.check.appendChild(this.el.label);

        this.el.input = document.createElement('input');
        this.el.input.type = 'checkbox';
        this.el.input.className = 'form-check-input';
        this.el.label.appendChild(this.el.input);
        if (this.text) {
            this.el.label.append(' ' + this.text);
        }
    }

}

XType.add('formcheck', XFormCheck);