// XNavbarCollapse.js

class XNavbarCollapse extends XObject {

    constructor(config) {
        super(config);
        this.id = this.config.id || `XNavbarCollapse${XNavbarCollapse.index}`;
        this.children = this.config.children || [];

        XNavbarCollapse.index++;
    }

    render() {
        this.el.collapse = document.createElement('div');
        this.el.collapse.className = 'collapse navbar-collapse';
        this.el.collapse.id = this.id;
        this.container.appendChild(this.el.collapse);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.collapse;
            obj.render.call(obj);
        });
    }

}

XNavbarCollapse.index = 0;

XType.add('navbarcollapse', XNavbarCollapse);