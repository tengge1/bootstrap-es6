// XAccordion.js

class XAccordion extends XObject {

    constructor(config) {
        super(config);
        this.id = this.config.id || `XAccordion${XAccordion.index}`;
        this.children = this.config.children || [];

        this.el = {};
        XAccordion.index++;
    }

    render() {
        this.el.accordion = document.createElement('div');
        this.el.accordion.id = this.id;
        this.el.accordion.role = 'tablist';
        this.container.appendChild(this.el.accordion);

        this.el.items = [];

        this.children.forEach((n, i) => {
            this.el.items[i] = X.create(n);
            this.el.items[i].container = this.el.accordion;
            if (typeof (this.el.items[i].render) == 'function') {
                this.el.items[i].render.call(this.el.items[i]);
            }
        });
    }

}

XAccordion.index = 0;

XType.add('accordion', XAccordion);