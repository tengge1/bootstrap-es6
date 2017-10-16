// DefinitionList.js

class XDefinitionList extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.dl = document.getElementById('dl');

    }

}

XType.add('definitionlist', XDefinitionList);
