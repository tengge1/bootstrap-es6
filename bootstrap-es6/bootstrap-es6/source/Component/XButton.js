// XButton.js

class XButton extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'Button';
        this.cls = this.config.cls || 'btn-primary';
        this.listeners = this.config.listeners || null;

        this.el = {};
        this.hasRendered = false;
    }

    render() {
        if (this.hasRendered) {
            return;
        }
        this.el.button = document.createElement('button');
        this.el.button.type = 'button';
        this.el.button.innerHTML = this.text;
        this.el.button.className = 'btn ' + this.cls;
        this.container.appendChild(this.el.button);
        new XEvent(this.el.button, this.listeners);

        this.hasRendered = true;
    }

}

XType.add('button', XButton);