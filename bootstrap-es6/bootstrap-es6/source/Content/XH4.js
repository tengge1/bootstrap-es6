// XH4.js

class XH4 extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.h4 = document.createElement('h4');
        this.el.h4.innerHTML = this.html;
        if (this.cls) {
            this.el.h1.className = this.cls;
        }
        this.container.appendChild(this.el.h4);
    }

}

XType.add('h4', XH4);