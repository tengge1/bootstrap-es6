// XAccordionItem.js

class XAccordionItem extends XObject {

    constructor(config) {
        super(config);

        this.el = {};
    }

    render() {
        this.el.header = document.createElement('div');
        this.el.header.className = 'card-header';
        this.el.header.role = 'tab';

    }

}

XAccordionItem.index = 0;

XType.add('accordionitem', XAccordionItem);