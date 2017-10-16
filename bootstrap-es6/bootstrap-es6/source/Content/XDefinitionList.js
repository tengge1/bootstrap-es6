// DefinitionList.js

class XDefinitionList extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.dl = document.createElement('dl');
        this.container.appendChild(this.el.dl);
        this.children.forEach((n, i) => {
            var obj = X.create(n);
            if (!obj instanceof XDefinitionItem) {
                throw 'XDefinitionList: config.children is not an array of instance of XDefinitionItem';
            }
            obj.container = this.el.dl;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('definitionlist', XDefinitionList);
