// XFormText.js

class XFormText extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text;
    }

    render() {
        this.el.text = document.createElement('small');
        this.el.text.className = 'form-text text-muted';
        this.el.text.innerHTML = this.text;
        this.container.appendChild(this.el.text);
    }

}

XType.add('formtext', XFormText);