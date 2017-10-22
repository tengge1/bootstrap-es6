// XTextarea.js

class XTextarea extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || '';
    }

    render() {
        this.el.textarea = document.createElement('textarea');
        this.el.textarea.className = 'form-control';
        this.el.textarea.innerHTML = this.html;
        this.container.appendChild(this.el.textarea);
    }

}

XType.add('textarea', XTextarea);