// XAccordion.js

class XAccordion extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {

    }

}

XAccordion.id = 0;

XType.add('accordion', XAccordion);