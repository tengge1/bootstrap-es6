// XInputGroupAddon.js

class XInputGroupAddon extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';
    }

    render() {
        this.el.span = document.createElement('span');
        this.el.span.className = 'input-group-addon';
        this.el.span.innerHTML = this.html;
        this.container.appendChild(this.el.span);
    }

}

XType.add('inputgroupaddon', XInputGroupAddon);