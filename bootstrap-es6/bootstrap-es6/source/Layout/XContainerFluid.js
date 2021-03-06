﻿// XContainerFluid.js

class XContainerFluid extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];

        this.el = {};
    }

    render() {
        this.el.container = document.createElement('div');
        this.el.container.className = 'container-fluid';
        this.container.appendChild(this.el.container);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.container;
            if (typeof (obj.render) == 'function') {
                obj.render.call(obj);
            }
        });
    }

}

XType.add('containerfluid', XContainerFluid);