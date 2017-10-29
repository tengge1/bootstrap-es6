// XExample.js

class XExample extends XObject {

    constructor(config) {
        super(config);
        this.margin = this.config.margin || '0.25rem';
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.container = document.createElement('div');
        this.el.container.className = 'container example';
        this.container.appendChild(this.el.container);

        this.el.style = document.createElement('style');
        document.head.appendChild(this.el.style);

        this.el.style.sheet.addRule('.example > *', `margin: ${this.margin};`);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.container;
            obj.render.call(obj);
        });
    }

}

XType.add('example', XExample);