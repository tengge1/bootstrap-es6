// XAccordionItem.js

class XAccordionItem extends XObject {

    constructor(config) {
        super(config);
        this.id = this.config.id || `XAccordionItem${XAccordionItem.index}`;
        this.title = this.config.title || 'title';
        this.active = this.config.active || false;
        this.children = this.config.children || [];

        this.el = {};
        XAccordionItem.index++;
    }

    render() {
        this.el.card = document.createElement('div');
        this.el.card.className = 'card';
        this.container.appendChild(this.el.card);

        this.el.header = document.createElement('div');
        this.el.header.className = 'card-header';
        this.el.header.role = 'tab';
        this.el.card.appendChild(this.el.header);

        this.el.h5 = document.createElement('h5');
        this.el.h5.className = 'mb-0';
        this.el.header.appendChild(this.el.h5);

        this.el.a = document.createElement('a');
        this.el.a.setAttribute('data-toggle', 'collapse');
        this.el.a.href = `#${this.id}`;
        this.el.a.innerHTML = this.title;
        this.el.h5.appendChild(this.el.a);

        this.el.collapse = document.createElement('div');
        this.el.collapse.id = this.id;
        this.el.collapse.className = 'collapse';
        if (this.active) {
            this.el.collapse.className += ' show';
        }
        this.el.collapse.role = 'tabpanel';
        this.el.collapse.setAttribute('data-parent', '#' + this.container.id);
        this.el.card.appendChild(this.el.collapse);

        this.el.body = document.createElement('div');
        this.el.body.className = 'card-body';
        this.el.collapse.appendChild(this.el.body);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.body;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XAccordionItem.index = 0;

XType.add('accordionitem', XAccordionItem);