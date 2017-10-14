// XBadge.js

class XBadge extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'Badge';
        this.cls = this.config.cls || 'badge-primary';

        this.el = {};
        this.hasRendered = false;
    }

    render() {
        if (this.hasRendered) {
            return;
        }
        this.el.badge = document.createElement('span');
        this.el.badge.innerHTML = this.text;
        this.el.badge.className = 'badge ' + this.cls;
        this.container.appendChild(this.el.badge);
        this.hasRendered = true;
    }

}

XType.add('badge', XBadge);