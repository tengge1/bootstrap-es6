// XJumbotron.js

class XJumbotron extends XObject {

    constructor(config) {
        super(config);
        this.children = this.config.children || [];
    }

    render() {
        this.el.jumbotron = document.createElement('div');
        this.el.jumbotron.className = 'jumbotron';
        this.container.appendChild(this.el.jumbotron);
    }

}

XType.add('jumbotron', XJumbotron);