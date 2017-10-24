// XHr.js

class XHr extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.hr = document.createElement('hr');
        if (this.cls) {
            this.el.hr.className = this.cls;
        }
        this.container.appendChild(this.el.hr);
    }

}

XType.add('hr', XHr);