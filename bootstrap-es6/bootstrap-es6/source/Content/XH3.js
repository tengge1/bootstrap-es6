// XH3.js

class XH3 extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.h3 = document.createElement('h3');
        this.el.h3.innerHTML = this.html;
        if (this.cls) {
            this.el.h1.className = this.cls;
        }
        this.container.appendChild(this.el.h3);
    }

}

XType.add('h3', XH3);