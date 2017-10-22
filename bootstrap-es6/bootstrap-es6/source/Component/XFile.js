// XFile.js

class XFile extends XObject {

    constructor(config) {
        super(config);
    }

    render() {
        this.el.input = document.createElement('input');
        this.el.input.type = 'file';
        this.el.input.className = 'form-control-file';
        this.container.appendChild(this.el.input);
    }

}

XType.add('file', XFile);