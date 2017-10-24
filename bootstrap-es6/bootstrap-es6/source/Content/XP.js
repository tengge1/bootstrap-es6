// XP.js

class XP extends XObject {

    constructor(config) {
        super(config);
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.p = document.createElement('p');
        if (this.cls) {
            this.el.p.className = this.cls;
        }
        this.container.appendChild(this.el.p);
    }

}

XType.add('p', XP);