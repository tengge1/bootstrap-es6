// XLinkButton.js

class XLinkButton extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'Button';
        this.cls = this.config.cls || 'btn-primary';
        this.url = this.config.url || '#';
        this.listeners = this.config.listeners || null;

        this.el = {};
        this.hasRendered = false;
    }

    render() {
        this.el.a = document.createElement('a');
        this.el.a.innerHTML = this.text;
        this.el.a.className = 'btn ' + this.cls;
        this.el.a.href = this.url;
        this.container.appendChild(this.el.a);
        new XEvent(this.el.a, this.listeners);
    }

}

XType.add('linkbutton', XLinkButton);