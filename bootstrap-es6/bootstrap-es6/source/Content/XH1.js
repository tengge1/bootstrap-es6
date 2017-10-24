// XH1.js

class XH1 extends XObject {

    constructor(config) {
        this.html = this.config.html || 'html';
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.h1 = document.createElement('h1');
        this.el.h1.innerHTML = this.html;
        if (this.cls) {
            this.el.h1.className = this.cls;
        }
        this.container.appendChild(this.el.h1);
    }

}

XType.add('h1', XH1);