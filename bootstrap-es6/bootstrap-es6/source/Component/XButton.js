// XButton.js

class XButton extends XObject {

    constructor(config) {
        super(config);
        this.text = this.config.text || 'Button';
        this.type = this.config.type || 'button';
        this.cls = this.config.cls || 'btn-primary';
        this.style = this.config.style || null;
        this.toggle = this.config.toggle || null;
        this.target = this.config.target || null;
        this.listeners = this.config.listeners || null;

        this.el = {};
    }

    render() {
        this.el.button = document.createElement('button');
        this.el.button.type = this.type;
        this.el.button.innerHTML = this.text;
        this.el.button.className = 'btn ' + this.cls;
        if (this.style) {
            this.el.button.style = this.style;
        }
        if (this.toggle) {
            this.el.button.setAttribute('data-toggle', this.toggle);
        }
        if (this.target) {
            this.el.button.setAttribute('data-target', this.target);
        }
        this.container.appendChild(this.el.button);
        new XEvent(this.el.button, this.listeners);
    }

}

XType.add('button', XButton);