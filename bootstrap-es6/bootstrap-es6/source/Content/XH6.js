// XH6.js

class XH6 extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.h6 = document.createElement('h6');
        this.el.h6.innerHTML = this.html;
        if (this.cls) {
            this.el.h1.className = this.cls;
        }
        this.container.appendChild(this.el.h6);
    }

}

XType.add('h6', XH6);