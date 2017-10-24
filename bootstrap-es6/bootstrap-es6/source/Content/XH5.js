// XH5.js

class XH5 extends XObject {

    constructor(config) {
        this.html = this.config.html || 'html';
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.h5 = document.createElement('h5');
        this.el.h5.innerHTML = this.html;
        if (this.cls) {
            this.el.h1.className = this.cls;
        }
        this.container.appendChild(this.el.h5);
    }

}

XType.add('h5', XH5);