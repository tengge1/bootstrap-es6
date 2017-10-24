// XH2.js

class XH2 extends XObject {

    constructor(config) {
        this.html = this.config.html || 'html';
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.h2 = document.createElement('h2');
        this.el.h2.innerHTML = this.html;
        if (this.cls) {
            this.el.h1.className = this.cls;
        }
        this.container.appendChild(this.el.h2);
    }

}

XType.add('h2', XH2);