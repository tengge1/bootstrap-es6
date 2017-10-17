// XCode.js

class XCode extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';
        this.inline = this.config.inline || false;
        this.scrollable = this.config.scrollable || false;

        this.el = {};
    }

    render() {
        if (this.inline) {
            this.el.code = document.createElement('code');
        } else {
            this.el.code = document.createElement('pre');
            if (this.scrollable) {
                this.el.code.className = 'pre-scrollable';
            }
        }
        this.el.code.innerHTML = this.html;
        this.container.appendChild(this.el.code);
    }

}

XType.add('code', XCode);