// XPopOver.js

class XPopOver extends XObject {

    constructor(config) {
        super(config);
        this.direction = this.config.direction || 'top'; // top left right bottom
        this.title = this.config.title || 'title';
        this.children = this.config.children || [];
        this.position = this.config.position || 'absolute';
    }

    render() {
        this.el.popover = document.createElement('div');
        this.el.popover.className = `popover bs-popover-${this.direction}`;
        this.el.popover.style.position = this.position;
        this.container.appendChild(this.el.popover);

        this.el.arrow = document.createElement('div');
        this.el.arrow.className = 'arrow';
        if (this.direction == 'top' || this.direction == 'bottom') {
            this.el.arrow.style.left = '50%';
        } else if (this.direction == 'left' || this.direction == 'right') {
            this.el.arrow.style.top = '50%';
        }
        this.el.popover.appendChild(this.el.arrow);

        this.el.header = document.createElement('h3');
        this.el.header.className = 'popover-header';
        this.el.header.innerHTML = this.title;
        this.el.popover.appendChild(this.el.header);

        this.el.body = document.createElement('div');
        this.el.body.className = 'popover-body';
        this.el.popover.appendChild(this.el.body);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.body;
            obj.render.call(obj);
        });
    }

}

XType.add('popover', XPopOver);