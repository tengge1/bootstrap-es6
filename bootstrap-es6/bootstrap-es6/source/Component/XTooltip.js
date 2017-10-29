// XTooltip.js

class XTooltip extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';
        this.direction = this.config.direction || 'top'; // top bottom left right
        this.position = this.config.position || 'absolute';
    }

    render() {
        this.el.tooltip = document.createElement('div');
        this.el.tooltip.className = `tooltip bs-tooltip-${this.direction}`;
        if (this.position) {
            this.el.tooltip.style.position = this.position;
        }
        this.el.tooltip.style.opacity = 1;
        this.el.tooltip.style.display = 'inline-block';
        this.container.appendChild(this.el.tooltip);

        this.el.arrow = document.createElement('div');
        this.el.arrow.className = 'arrow';
        if (this.direction == 'top' || this.direction == 'bottom') {
            this.el.arrow.style.left = '50%';
        } else if (this.direction == 'left' || this.direction == 'right') {
            this.el.arrow.style.top = '50%';
        }
        this.el.tooltip.appendChild(this.el.arrow);

        this.el.content = document.createElement('div');
        this.el.content.className = 'tooltip-inner';
        this.el.content.innerHTML = this.html;
        this.el.tooltip.appendChild(this.el.content);
    }

}

XType.add('tooltip', XTooltip);