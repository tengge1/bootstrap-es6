// XDefinitionItem.js

class XDefinitionItem extends XObject {

    constructor(config) {
        super(config);
        this.title = this.config.title || 'title';
        this.text = this.config.text || 'text';

        this.el = {};
    }

    render() {
        if (this.container == null) {
            throw 'XDefinitionItem: config.container is undefined.';
        }
        if (this.container.tagName == null || this.container.tagName.toLowerCase() != 'dl') {
            throw 'XDefinitionItem: config.container is not HTMLElement';
        }
        this.el.dt = document.createElement('dt');
        this.el.dt.innerHTML = this.title;
        this.container.appendChild(this.el.dt);
        this.el.dd = document.createElement('dd');
        this.el.dd.innerHTML = this.text;
        this.container.appendChild(this.el.dd);
    }

}

XType.add('definitionitem', XDefinitionItem);